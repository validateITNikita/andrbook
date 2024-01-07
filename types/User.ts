import { FetchBalanceResult } from "@wagmi/core";
import { address } from "@/types/Address";

export const enum STATUS {
    CONNECTED,
    DISCONNECTED,
    CONNECTING
};

export type IUser = {
    address: address | null;
    balance: FetchBalanceResult | null;
    status: STATUS;
};