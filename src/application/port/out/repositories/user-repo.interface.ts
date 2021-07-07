import { UserDto } from "src/adapters/driving/dtos/userDto";
import { IUser } from "src/domain/entities/user.entity";


export interface IUserRepository {
    createUser(createUserDto: UserDto) : Promise<IUser> 

    findUserByWalletName(walletName: string) : Promise<IUser> 

    findUserByAddress(publicKey: string) : Promise<IUser> 

    updateUserBalance(balance: number, publicKey: string) : Promise<IUser>



    // findUser(address: string): Promise<IUser>
    
    // saveUser(userDto: any): Promise<void>


}