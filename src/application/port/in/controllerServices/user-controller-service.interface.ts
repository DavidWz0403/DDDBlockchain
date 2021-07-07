import { IUser } from "src/domain/entities/user.entity";

export interface IUserController {
    signUpNewUser(userDto): Promise<IUser>

    signIn(authDto): Promise<{accessToken: string}>
}