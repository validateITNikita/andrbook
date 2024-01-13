import { readTotalSupplyConfig, readMaxSupplyConfig } from "@/contract";
import { gentlemenABI } from "@/contract/abi";

export default () => {
    const { data: totalSupply, refetch: refetchTotalSupply } = useContractRead(
        {
            address: useGetContractAddress(),
            abi: gentlemenABI,
            functionName: "totalSupply",
        }
    );

    const { data: maxSupply, refetch: refetchMaxSupply } = useContractRead(readMaxSupplyConfig);

    return {
        totalSupply,
        maxSupply,
        refetchTotalSupply,
        refetchMaxSupply,
    };
};
