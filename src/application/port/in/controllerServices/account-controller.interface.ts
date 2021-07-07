import { TransactionDto } from "src/adapters/driving/dtos/transactionDto";

export interface IAccountController {
    createTransaction(transactionDto: TransactionDto)
}