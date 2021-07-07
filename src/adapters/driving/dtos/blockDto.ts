import { ITransaction } from "src/domain/entities/transaction.entity";

export class BlockDto {
    id: number; 
    hash: string; 
    previousHash: string; 
    nonce: number; 
    timestamp: Date; 
    transactions: ITransaction[]; 
    merkleHash: string; 
    transactionsMined: boolean;
    transactionHashes: string[]; 
}