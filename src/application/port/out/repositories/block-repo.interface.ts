import { BlockDto } from "src/adapters/driving/dtos/blockDto";
import { updateBlockDto } from "src/adapters/driving/dtos/updateBlockDto";
import { IBlock } from "src/domain/entities/block.entity";


export interface IBlockRepository {
    getBlocks(): Promise<IBlock[]>

    createGenesisBlock(blockDto: BlockDto): Promise<IBlock>

    updateBlock(updateBlockDto: updateBlockDto, id): Promise<IBlock>

    findLatestBlock(): Promise<IBlock>

    // findBlock(): Promise<IBlock>

    // getDataToMine(): any // getDataToMineDto

    // createBlock
}