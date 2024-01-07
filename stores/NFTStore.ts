import { ethers } from "ethers"
import { useBlockchainStore } from "./BlockchainStore"
import { useUserStateStore } from "./UserStateStore"
import { useUserStore } from "./UserStore"

import {NFT_Metadata, RARITY} from '~/types/GentelmanNFT';

export const useNFTStore = defineStore('NFT_STORE', () => {

    const ABI = [
        "constructor()",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
        "event Minted(address _from)",
        "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
        "event TransferReceived(address _from, uint256 _amount)",

        "function _isMintEnabled() view returns (bool)",
        "function _maxSupply() view returns (uint16)",
        "function _mintPrice() view returns (uint256)",
        "function approve(address to, uint256 tokenId)",
        "function balanceOf(address owner) view returns (uint256)",
        "function changeMintPrice(uint256 newMintPrice)",
        "function changeTokenURI(uint256 tokenID, string newTokenURI)",
        "function getApproved(uint256 tokenId) view returns (address)",
        "function isApprovedForAll(address owner, address operator) view returns (bool)",
        "function name() view returns (string)",
        "function owner() view returns (address)",
        "function ownerOf(uint256 tokenId) view returns (address)",
        "function recipients(uint256) view returns (address)",
        "function renounceOwnership()",
        "function safeMint(string uri) payable",
        "function safeTransferFrom(address from, address to, uint256 tokenId)",
        "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
        "function setApprovalForAll(address operator, bool approved)",
        "function supportsInterface(bytes4 interfaceId) view returns (bool)",
        "function symbol() view returns (string)",
        "function toggleMinting(bool enabled)",
        "function tokenByIndex(uint256 index) view returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
        "function tokenURI(uint256 tokenId) view returns (string)",
        "function totalSupply() view returns (uint256)",
        "function transferFrom(address from, address to, uint256 tokenId)",
        "function transferOwnership(address newOwner)",
        "function walletMints(address) view returns (uint256)",
        "function withdraw() payable"
    ]

    const loadingMintInfo = ref(true);

    interface NFT_STRUCT {
        CONTRACT: string,
        TESTNET_CONTRACT: string,
        MINT_PRICE: number | null,
        TOTAL_SUPPLY: number | null,
        MAX_SUPPLY: number
    }
    
    const NFT = ref<NFT_STRUCT>( {
        CONTRACT : '0xD5B755874b15C1f55bc3f57D65bC919c037a84C4',
        TESTNET_CONTRACT: '0xac626E28B95046E99Cde94144F324Fc1dfb8159c',
        MINT_PRICE: 0,
        TOTAL_SUPPLY: 0,
        MAX_SUPPLY: 333
    })

    const initNFT = async () => {

        loadingMintInfo.value = true;
        
        const {mintPrice, totalSupply}  = await getNFTData();
        NFT.value.MINT_PRICE = mintPrice;
        NFT.value.TOTAL_SUPPLY = totalSupply;

        loadingMintInfo.value = false;
    }

    const getNFTData = async () : Promise<{
        mintPrice: number | null, totalSupply : number | null
    }> => {

        const mintPrice = await getMintPrice();
        const totalSupply = await getTotalSupply();

        return {
            mintPrice, totalSupply
        }
    }

    const getTotalSupply = async () : Promise<number | null> => {
        // @ts-ignore
        // const {contract} = useEther({
        //     providerUrl: useBlockchainStore()!.TESNET_NETWORK!.rpcUrls![0] ,
        //     ABI: ABI,
        //     contractAddress: 
        // })

        let rpc = useBlockchainStore()!.NETWORK!.rpcUrls![0];
        let _address = NFT.value.CONTRACT;

        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const contract = new ethers.Contract(_address, ABI, provider);

        let totalSupply = null;

        if(contract) {
            try {
                let totalSupplyBN = await contract.totalSupply();

                totalSupply = Number(totalSupplyBN);

            } catch (error) {
                console.log(error);
                
            }
        }
        
        return totalSupply;
    }

    const getMintPrice = async () : Promise<number | null> => {
        // @ts-ignore
        // const {contract} = useEther({
        //     providerUrl: useBlockchainStore()!.TESNET_NETWORK!.rpcUrls![0] ,
        //     ABI: ABI,
        //     contractAddress: useRuntimeConfig().isMainnet ? NFT.value.CONTRACT : NFT.value.TESTNET_CONTRACT
        // })

        let rpc = useBlockchainStore()!.NETWORK!.rpcUrls![0];
        let _address = NFT.value.CONTRACT;

        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const contract = new ethers.Contract(_address, ABI, provider);

        let mintPrice = null;

        if(contract) {
            try {
                let mintPriceBN = await contract._mintPrice();

                mintPrice = Number(ethers.utils.formatEther(mintPriceBN));
            } catch (error) {
                console.log(error);
                
            }
        }
        

        return mintPrice;
    }

    const mint = async () => {
        if(!useUserStateStore().IS_USER_CONNECTED) return;
        if(!useUserStore().CURRENT_USER.balance || !NFT.value.MINT_PRICE ||
            Number(useUserStore().CURRENT_USER.balance) < NFT.value.MINT_PRICE) return;
        

            // @ts-ignore
        // const {provider,contract} = useEther({
        //     providerUrl: window.ethereum ,
        //     ABI: ABI,
        //     contractAddress: useRuntimeConfig().isMainnet 
        //     ? NFT.value.CONTRACT : NFT.value.TESTNET_CONTRACT
        // })

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let _address =  NFT.value.CONTRACT;
        const contract = new ethers.Contract(_address, ABI, signer)
        
        try {
            let GetNextTokenURI = () : string  => {
                
                
                let base = useRuntimeConfig().public.baseURL.split('//')[1];
                
                let nextID = 0;

                if(NFT.value.TOTAL_SUPPLY != null ){

                    nextID = NFT.value.TOTAL_SUPPLY + 1 ;
                    let uri = `${base}api/${nextID}.json`;
                    

                    return uri;
                }
                else{
                    throw new Error('Could not get total supply.')
                }

            }

            let tokenURI = GetNextTokenURI();
            
            const mintTX = await contract!.safeMint(tokenURI, {
                value: ethers.utils.parseEther(NFT.value.MINT_PRICE.toString())
            });

            await mintTX.wait(1);

            await initNFT();
            await useUserStore().setupUser();

        } catch (error) {
            console.log(error);
        }

    }

    const getNFTLinkDataByTokenID = (tokenID : number | string) : string => {
        let base = useRuntimeConfig().public.baseURL;
        let uri = `${base}api/${tokenID}.json`;

        return uri;
    }

    const getImageIpfsLinkByTokenId = async (tokenID : number | string) : Promise<string> => {
        const link = getNFTLinkDataByTokenID(tokenID);

        const metadata = <NFT_Metadata>(await fetch(link).then(res => res.json()));
        const imageLink = metadata.imageIPFSLink;

        return imageLink;
    }

    const getRarityByTokenId = async (tokenID : number | string) : Promise<RARITY> => {
        const link = getNFTLinkDataByTokenID(tokenID);

        const metadata = <NFT_Metadata>(await fetch(link).then(res => res.json()));
        const rarity = metadata.attributes[0].value;

        return rarity;
    }

    const sendGentelmanTo = async (receiver : string, tokenId : number) => {
        let _contract = NFT.value.CONTRACT ;
        
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(_contract, ABI, signer)

            const sendTX = await contract.transferFrom(await signer.getAddress(), receiver, tokenId);
            await sendTX.wait(1);

            document.location.reload();
        } catch (error) {
            console.log('Error while sending NFT to ' + receiver, error);
        }
    }

    const getNFTBalance = async () : Promise<number | undefined> => {

        let _contract = NFT.value.CONTRACT ;
        
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(_contract, ABI, signer)
            // const {provider,contract} = useEther({
            //     providerUrl: window.ethereum,
            //     ABI: ABI,
            //     contractAddress: _contract
            // })
        

            const nftBalance = (
                await contract.balanceOf(
                    await signer.getAddress()
                )
            ).toString();

            return Number(nftBalance);
        } catch (error) {
            console.log('error while getting NFT Balance');
        }
    }

    return {
        
        ABI, mint, initNFT, NFT, getNFTBalance, getNFTLinkDataByTokenID, getImageIpfsLinkByTokenId, getRarityByTokenId, sendGentelmanTo,

        loadingMintInfo
    }
})