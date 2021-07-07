import { Injectable } from "@nestjs/common";
import { BlockRepository } from "src/adapters/driven/persistance/block.repository";
import { BlockDto } from "src/adapters/driving/dtos/blockDto";
import { IBlock } from "src/domain/entities/block.entity";
import { validateGenesisBlock } from "src/domain/services/Block/validateGenesisBock";
import { IBlockGenesis } from "../port/in/usecaseServices/block-services.interface";

@Injectable()

export class GenesisBlockService implements IBlockGenesis{
    constructor(private readonly blockRepo: BlockRepository){}

    async generateGenesis():Promise<IBlock>{
        const blocks = await this.blockRepo.getBlocks()
        if(validateGenesisBlock(blocks)){
            return this.blockRepo.createGenesisBlock();
        }
    }
}