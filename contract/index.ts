import type { UseReadContractParameters } from "use-wagmi"
import { gentlemenABI } from "./abi";
import useGetContractAddress from "@/composables/useGetContractAddress";

export const readMintPriceConfig: UseReadContractParameters = {
    address: useGetContractAddress(),
    abi: gentlemenABI,
    functionName: "_mintPrice",
};

export const readTotalSupplyConfig: UseReadContractParameters = {
    address: useGetContractAddress(),
    abi: gentlemenABI,
    functionName: "totalSupply",
}

export const readMaxSupplyConfig: UseReadContractParameters = {
    address: useGetContractAddress(),
    abi: gentlemenABI,
    functionName: "_maxSupply",
}

export const readIsMintEnabledConfig: UseReadContractParameters = {
    address: useGetContractAddress(),
    abi: gentlemenABI,
    functionName: "_isMintEnabled",
}