import { ethers } from "ethers";
// import {  } from "~~/types/ethers-contracts";

export default defineEventHandler(async (event) => {
    if (!event.context.params)
        return {
            data: "ERROR! Try again!",
        };

    let gen_id: string = event.context.params.id;
    let id = Number(gen_id.split(".json")[0]);

    // !
    let CONTRACT = "0x287ecF9B3Ad21f23f76FB74af877983cDFd8AeF4";

    let provider = new ethers.providers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
    );
    // men contract

    // let contract = BUNS__factory.connect(CONTRACT, provider);

    let supply = Number(await contract.totalSupply()) || 0;

    if (!id || id < 1 || id > supply) {
        let assetsPath = `/assets/server/men/metadata/hidden.json`;
        let data = await useStorage().getItem(assetsPath);
        return data;
    } else {
        let assetsPath = `/assets/server/men/metadata/${gen_id}`;
        let data = await useStorage().getItem(assetsPath);
        return data;
    }
});
