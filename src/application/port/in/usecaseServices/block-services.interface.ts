import { IBlock } from "src/domain/entities/block.entity";


export interface IBlockGenesis {
    generateGenesis(blockDto): Promise<IBlock>
}

export interface IBlockMerkleHash {
    merkleTreeHash(
        hashes: string []
    )
}

export interface IGetDataToMine {
    getDataToMine(): any //dataToMineDto
}

export interface IGenerateBlock {
    mining(
        dataToMine: any // dataToMineDto
    ) : Promise<IBlock>
}