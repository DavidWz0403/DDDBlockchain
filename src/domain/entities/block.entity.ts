import { ITransaction } from "./transaction.entity";

export interface IBlock {
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