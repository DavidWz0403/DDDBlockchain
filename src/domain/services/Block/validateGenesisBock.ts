import { IBlock } from "src/domain/entities/block.entity"

export const validateGenesisBlock = (blocks: IBlock[] ) => {
    if(!blocks.length){
        return true
    }
}