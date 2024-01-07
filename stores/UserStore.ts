import { ethers } from "ethers"
import { useBlockchainStore } from "./BlockchainStore"
import { useUserStateStore } from "./UserStateStore"
import { useNFTStore } from "./NFTStore"
import { GentelmanNFT } from "~~/types/GentelmanNFT"

export const useUserStore = defineStore('CURRENT_USER', () => {
    

    interface User {
        address : string | null
        balance : number | string | null,
        nftBalance : number | string | null,
        userGentelmans: GentelmanNFT[],
        isOwner : boolean
    }

    const CURRENT_USER = ref<User>({
        address : null,
        balance : 0,
        nftBalance: 0,
        userGentelmans: [],
        isOwner : false
    });

    const connectToWallet = async () => {
        useUserStateStore().IS_USER_CONNECTING = true;
        
        // const {connect, switchChain} = useConnect();
        const {connect, switchChain} = useBlockchainStore();
        await connect(window.ethereum);

        
        // if(useRuntimeConfig().isMainnet == false) {
        //     await switchChain(window.ethereum,useBlockchainStore().TESTNET_CHAIN_ID);
        // }
        // else {
            await switchChain(window.ethereum, useBlockchainStore().CHAIN_ID);
        // }
        
        await setupUser();
        await useNFTStore().initNFT();

        useUserStateStore().IS_USER_CONNECTING = false;
        useUserStateStore().IS_USER_CONNECTED = true;
    }

    const disconnectWallet = async () => {
        const {disconnect} = useBlockchainStore();
        
        useUserStateStore().IS_USER_CONNECTING = true;
        
        await disconnect(window.ethereum);
        await clearUser();

        useUserStateStore().IS_USER_CONNECTED = false;
        useUserStateStore().IS_USER_CONNECTING = false;
    }

    const setupUser = async () => {
        await setUserAddress();
        await setBalance();
        await setNFTBalance();
        await setIsOwner();
        await getUserNFTS();
    }
    
    

    const setIsOwner = async () => {
        const {getSigner} = useBlockchainStore();
        const signer = await getSigner(window.ethereum);
        const contract = new ethers.Contract(useNFTStore().NFT.CONTRACT, useNFTStore().ABI, signer);
        
        let owner = <string>await contract.owner();
        let connectedAddress = await signer.getAddress();

        CURRENT_USER.value.isOwner = owner.toString().toUpperCase() == connectedAddress.toString().toUpperCase();
    }

    const getUserNFTS = async () => {
        
        
        // @ts-ignore
        // const {contract} = useEther({
        //     providerUrl: useBlockchainStore()!.TESNET_NETWORK!.rpcUrls![0] ,
        //     ABI: useNFTStore().ABI,
        //     contractAddress: useRuntimeConfig().isMainnet ? useNFTStore().NFT.CONTRACT : useNFTStore().NFT.TESTNET_CONTRACT
        // })

        let rpc = useBlockchainStore()!.NETWORK!.rpcUrls![0] ;

        let contractAddress =  useNFTStore().NFT.CONTRACT;

        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const contract = new ethers.Contract(
            contractAddress, useNFTStore().ABI, provider
        );

        let address = CURRENT_USER.value.address;
        let nftBalance = Number(CURRENT_USER.value.nftBalance);
        
        let index = 0;
        while(index < nftBalance){

            try {
                let gentelmanTokenID = (await contract!.tokenOfOwnerByIndex(address, index)).toString();
                console.log(gentelmanTokenID);
                
                // increase to ids
                let idToApi = Number(gentelmanTokenID) + 1;
                let imageSoure = await useNFTStore().getImageIpfsLinkByTokenId(idToApi);
                let rarity = await useNFTStore().getRarityByTokenId(idToApi)

                CURRENT_USER.value.userGentelmans.push({
                    tokenId: gentelmanTokenID,
                    rarity: rarity,
                    image: imageSoure
                })
            } catch (error) {
                console.log(error);
                
            }

            index++;
        }

        CURRENT_USER.value.userGentelmans.push();
        
    }

    const clearUser = async () => {
        CURRENT_USER.value.address = '';
        CURRENT_USER.value.balance = 0;
        CURRENT_USER.value.nftBalance = 0;
        CURRENT_USER.value.userGentelmans = [];
    }

    const setUserAddress = async () => {
        // const {account, connect} =  useConnect();
        // await connect();
        
        // const {} = useBlockchainStore();

        // CURRENT_USER.value.address = account.value;
    }

    const setNFTBalance = async () => {
        if(!CURRENT_USER.value.address) return;

        const {getSigner, connect} = useBlockchainStore();
        await connect(window.ethereum);

        let nftBalance = 0;

        let signer = await getSigner(window.ethereum);
        if(signer){
             nftBalance = <number>await useNFTStore().getNFTBalance();
        }

        

        CURRENT_USER.value.nftBalance = nftBalance;
    }
    const setBalance = async () => {
        if(!CURRENT_USER.value.address) return;

        // const {data, connect} = useConnect();
        const {getSigner} = useBlockchainStore();
        let signer = await getSigner(window.ethereum);

        let balance = 0;

        if(signer){
            balance = Number(ethers.utils.formatEther(await signer.getBalance()));
        }


        CURRENT_USER.value.balance = balance;
    }

    const isUserOwner = computed<boolean>(() => {
        return CURRENT_USER.value.isOwner && useUserStateStore().IS_USER_CONNECTED;
    })
    

    return {
        connectToWallet, disconnectWallet,
        setUserAddress, setBalance, setupUser, getUserNFTS,

        CURRENT_USER, isUserOwner
    }
})