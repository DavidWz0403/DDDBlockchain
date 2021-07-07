import { Injectable } from '@nestjs/common';
import { BlockRepository } from 'src/adapters/driven/persistance/block.repository';
import { TransactionRepository } from 'src/adapters/driven/persistance/transaction.repository';
import { UserRepository } from 'src/adapters/driven/persistance/user.repository';
import { TransactionDto } from 'src/adapters/driving/dtos/transactionDto';
import { updateBlockDto } from 'src/adapters/driving/dtos/updateBlockDto';
import { calculateDepositBalance } from 'src/domain/services/Transaction/calculateDepositBalance';
import { calculateWithdrawBalance } from 'src/domain/services/Transaction/calculateWithdrawBalance';
import { validateTransaction } from 'src/domain/services/Transaction/validateTransaction';
import { IAccountService } from '../port/in/usecaseServices/account-service.interface';

@Injectable()
export class AccountService implements IAccountService{
    constructor(
        private readonly userRepo: UserRepository,
        private readonly transactionRepo: TransactionRepository,
        private readonly blockRepo: BlockRepository
        ){}

    async Transaction(transactionDto: TransactionDto){
       let {fromAddress, toAddress, amount} = transactionDto;

       const withdrawUser = await this.userRepo.findUserByAddress(fromAddress);
       const depositUser = await this.userRepo.findUserByAddress(toAddress);

       if(depositUser && withdrawUser) {
        let withdrawBalance = withdrawUser.balance;
        let depositBalance = depositUser.balance; 

        if(validateTransaction(amount, withdrawBalance)){
            withdrawBalance = calculateWithdrawBalance(amount, withdrawBalance);
            depositBalance = calculateDepositBalance(amount, depositBalance)
            
            await this.userRepo.updateUserBalance(withdrawBalance, withdrawUser.publicKey);
            

            await this.userRepo.updateUserBalance(depositBalance, depositUser.publicKey);
            

            const transaction =  await this.transactionRepo.createTransaction(transactionDto); 
            const updateBlockDto: updateBlockDto = {
                transaction: transaction,
                transactionHash: transaction.transactionHash
            }

            const latestBlock = await this.blockRepo.findLatestBlock();

            await this.blockRepo.updateBlock(updateBlockDto, latestBlock.id); 
            

        } 
       }
      


    }
}
