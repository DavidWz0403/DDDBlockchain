import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "src/adapters/driven/persistance/user.repository";
import { JwtPayload } from "src/adapters/driving/dtos/jwt-payload.interface";
import { AuthDto } from "../dtos/authDto";

@Injectable()
export class AuthenticationService {
    constructor( private readonly userRepo: UserRepository,
        private readonly jwtService: JwtService){}
    async signIn(authDto: AuthDto): Promise<{accessToken}>{
        const {walletName, privateKey} = authDto;
        const user = await this.userRepo.findUserByWalletName(walletName);
        
        if(user && await bcrypt.compare(privateKey, user.privateKey) ){
            const payload: JwtPayload = {walletName};
            const accessToken: string = await this.jwtService.sign(payload);
            return {accessToken}
        } else {
            throw new UnauthorizedException('Check login credentials')
        }

    }
}