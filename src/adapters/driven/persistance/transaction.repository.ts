import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TransactionDto } from "src/adapters/driving/dtos/transactionDto";
import { ITransaction } from "src/domain/entities/transaction.entity";
import { Model } from "mongoose";
import { ITransactionRepo } from "src/application/port/out/repositories/transaction-repo.interface";


@Injectable()

export class TransactionRepository implements ITransactionRepo{
    constructor(@InjectModel('Transaction') private readonly transactionModel: Model<ITransaction>){}

    async createTransaction(transactionDto: TransactionDto){
        const {amount, fromAddress, toAddress} = transactionDto;
        const SHA256 = require('crypto-js/sha256');

        const timestamp = Date.now();
        const tHash = SHA256(amount + fromAddress + toAddress + timestamp)

        const newTransaction = new this.transactionModel({
            amount,
            fromAddress,
            toAddress,
            transactionHash: tHash,
            timestamp: timestamp
        })

       const result = await newTransaction.save(); 

        return result
    }
}