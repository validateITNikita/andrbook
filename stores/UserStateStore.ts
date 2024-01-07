export const useUserStateStore  = defineStore('userState' , () => {

    const IS_USER_CONNECTED = false;
    const IS_USER_CONNECTING = false;

    return {
        IS_USER_CONNECTED, IS_USER_CONNECTING
    }
})