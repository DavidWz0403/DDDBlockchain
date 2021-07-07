import { Injectable } from "@nestjs/common";
import { UserDto } from "src/adapters/driving/dtos/userDto";
import * as bcrypt from 'bcrypt'; 
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/application/port/out/repositories/user-repo.interface";


@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>){}

    async createUser(createUserDto: UserDto): Promise<IUser>{
        let {walletName} = createUserDto;

        const EC = require('elliptic').ec;
        const ec = new EC('secp256k1');

        const key = ec.genKeyPair();
        // frontend
        const genPublicKey: string = key.getPublic('hex');
        const genPrivateKey: string = key.getPrivate('hex'); 
        console.log(genPrivateKey);
        //hash privateKey

        const salt = await bcrypt.genSalt();
        const hashedPrivateKey = await bcrypt.hash(genPrivateKey, salt);

        const startBalance = 100;

        const newUser = new this.userModel({
            walletName,
            publicKey: genPublicKey,
            privateKey: hashedPrivateKey,
            balance: startBalance
        })

        const result = await newUser.save()

        return result; 
    }


    async findUserByWalletName(walletName:string): Promise<IUser>{
        const user = await this.userModel.findOne({walletName: walletName}).exec();

        return user
    }

    async findUserByAddress(publicKey: string): Promise<IUser>{
        const user = await this.userModel.findOne({publicKey: publicKey}).exec();

        return user
    }

    async updateUserBalance(newBalance : number, publicKey: string): Promise<IUser> {
        const updatedUser = await this.userModel.findOne({publicKey: publicKey}).exec();
        if(newBalance){
            updatedUser.balance = newBalance
        }

        updatedUser.save()
        return updatedUser
    }


   
}