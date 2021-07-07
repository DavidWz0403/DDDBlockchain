export interface ITransaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    transactionHash: string; 
    timestamp: Date;
}