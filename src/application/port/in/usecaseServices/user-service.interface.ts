import { AuthDto } from "src/adapters/driving/dtos/authDto";
import { UserDto } from "src/adapters/driving/dtos/userDto";
import { IUser } from "src/domain/entities/user.entity";

export interface IUserServices {
    signUp(userDto: UserDto): Promise<IUser>


    // validate(payload: JwtPayload): Promise<IUser>

    // transaction(transactionDto: any): Promise<ITransaction>

    
}