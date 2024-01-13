import { readMintPriceConfig } from "@/contract";
import { formatEther } from "ethers";

export default () => {
    const { data: mintPrice, refetch: refetchMintPrice } =
        useContractRead(readMintPriceConfig);

    const getMintPrice = computed(() =>
        formatEther(
            (mintPrice.value as string) ? (mintPrice.value as string) : "0"
        )
    );

    return {
        mintPrice,
        getMintPrice,
        refetchMintPrice,
    };
};
