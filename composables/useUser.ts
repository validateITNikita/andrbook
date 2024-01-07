import { IUser, STATUS } from "@/types/User";

const User = ref<IUser>({
    address: null,
    balance: null,
    status : STATUS.DISCONNECTED
});

export const useUser = () => {

    return {
        User
    };
};
