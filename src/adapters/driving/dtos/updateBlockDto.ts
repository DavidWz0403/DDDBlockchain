import { ITransaction } from "src/domain/entities/transaction.entity";

export class updateBlockDto {
    transaction: ITransaction
    transactionHash: string; 
}