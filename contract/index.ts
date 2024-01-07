import { UseContractReadConfig } from "use-wagmi"
import { gentlemenABI } from "./abi";
import useGetContractAddress from "@/composables/useGetContractAddress";

export const readMintPriceConfig: UseContractReadConfig = {
    address: useGetContractAddress(),
    abi: gentlemenABI,
    functionName: "_mintPrice",
};

export const readTotalSupplyConfig: UseContractReadConfig = {
    address: useGetContractAddress(),
    abi: gentlemenABI,
    functionName: "totalSupply",
}

export const readMaxSupplyConfig: UseContractReadConfig = {
    address: useGetContractAddress(),
    abi: gentlemenABI,
    functionName: "_maxSupply",
}

export const readIsMintEnabledConfig: UseContractReadConfig = {
    address: useGetContractAddress(),
    abi: gentlemenABI,
    functionName: "_isMintEnabled",
}