import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy,  } from "passport-jwt";
import { UserRepository } from 'src/adapters/driven/persistance/user.repository';
import { JwtPayload } from 'src/adapters/driving/dtos/jwt-payload.interface';
import { IUser } from 'src/domain/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userRepo: UserRepository
    ){
        super({
            secretOrKey: 'topSecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload): Promise<IUser> {
        const {walletName} = payload;
        const user: IUser = await this.userRepo.findUserByWalletName(walletName);

        if(!user){
            throw new UnauthorizedException
        }

        return user; 
    }
}
