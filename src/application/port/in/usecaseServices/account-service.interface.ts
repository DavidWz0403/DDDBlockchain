import { TransactionDto } from "src/adapters/driving/dtos/transactionDto";

export interface IAccountService {
    Transaction(transactionDto: TransactionDto)
}