import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/adapters/driven/persistance/user.repository';
import { AuthDto } from 'src/adapters/driving/dtos/authDto';
import { UserDto } from 'src/adapters/driving/dtos/userDto';
import { IUser } from 'src/domain/entities/user.entity';

import { JwtPayload } from 'src/adapters/driving/dtos/jwt-payload.interface';
import { IUserServices } from '../port/in/usecaseServices/user-service.interface';


@Injectable()
export class UserService implements IUserServices{
    constructor(
        private readonly userRepo: UserRepository,
        private readonly jwtService: JwtService
        ){
       
    }

    async signUp(userDto: UserDto): Promise<IUser> {
        return this.userRepo.createUser(userDto)
    }

    
}
