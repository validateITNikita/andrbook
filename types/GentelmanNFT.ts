export type RARITY = 'Neutro' | 'Rare' | 'Super Rare' | 'Super Super Rare' | 'Unique';

export interface GentelmanNFT {
    tokenId : number,
    rarity: RARITY,
    image : string
}

export interface NFT_Metadata {
    name : string,
    description : string,
    edition : number,
    image : string,
    imageIPFSLink : string,
    date : number,
    external_url : string,
    attributes : Attribute[],
}

export interface Attribute {
    // TYPE  = RARITY
    trait_type : string
    // VALUEs
    value : RARITY 
}