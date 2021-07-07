import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IBlockRepository } from "src/application/port/out/repositories/block-repo.interface";
import { IBlock } from "src/domain/entities/block.entity";
import { Model } from "mongoose";
import { BlockDto } from "src/adapters/driving/dtos/blockDto";
import { updateBlockDto } from "src/adapters/driving/dtos/updateBlockDto";

@Injectable()


export class BlockRepository implements IBlockRepository {
    constructor(@InjectModel('Block') private readonly blockModel: Model<IBlock>  ){}


    async getBlocks(): Promise<IBlock[]>{
        const blocks = await this.blockModel.find().exec();

        return blocks;
    }

    async createGenesisBlock(): Promise<IBlock>{
        

        const newBlock = new this.blockModel({
            id: 1,
            hash: 'First',
            previousHash: 'null',
            nonce: 0,
            timestamp: Date.now(),
            transactions: [],
            merkleHash: 'null',
            transactionsMined: true,
            transactionHashes: []
        })

        const block = await newBlock.save();

        return block; 
    }


    async updateBlock(updateBlockDto: updateBlockDto, id ): Promise<IBlock> {
        const {transaction, transactionHash} = updateBlockDto;
        console.log(transaction, transactionHash)
        const toUpdateBlock = await this.blockModel.findOne({id: id}).exec()
        if(transaction && transactionHash){
            toUpdateBlock.transactions = [...toUpdateBlock.transactions, transaction];
            toUpdateBlock.transactionHashes = [...toUpdateBlock.transactionHashes, transactionHash]

            console.log(toUpdateBlock)
            const updatedBlock = await toUpdateBlock.save()
            return updatedBlock; 
        }
        
    }


    async findLatestBlock(): Promise<IBlock> {
       const blocks =  await this.blockModel.aggregate([{ $sort: { id: -1 } }, { $limit: 1 }]);

        const latestBlock = blocks[0];

        return latestBlock
    }
}