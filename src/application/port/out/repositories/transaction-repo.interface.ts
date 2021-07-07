import { TransactionDto } from "src/adapters/driving/dtos/transactionDto";

export interface ITransactionRepo{
    createTransaction(transactionDto: TransactionDto)
}