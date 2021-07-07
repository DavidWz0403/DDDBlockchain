import { Body, Controller, Post } from '@nestjs/common';
import { IUserController } from 'src/application/port/in/controllerServices/user-controller-service.interface';
import { UserService } from 'src/application/services/user.service';
import { AuthDto } from '../dtos/authDto';
import { UserDto } from '../dtos/userDto';
import { AuthenticationService } from '../guards/authentication-service';

@Controller('user')
export class UserController implements IUserController {
    constructor(private readonly userService: UserService,
        private readonly authService: AuthenticationService){
    }

    @Post('/signUp')
    async signUpNewUser(@Body() userDto: UserDto){
        const newUser = await this.userService.signUp(userDto);

        return newUser; 
    }

    @Post('/signIn')
    async signIn(@Body() authDto: AuthDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authDto)
    }
}
