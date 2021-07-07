import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from 'src/application/services/account.service';
import { TransactionDto } from '../dtos/transactionDto';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService){}

    @Post()
    async createTransaction(@Body() transactionDto: TransactionDto){
        return await this.accountService.Transaction(transactionDto)
    }
}
