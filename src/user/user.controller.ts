import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.userService.createUser(createUserDto);
            return {
                success: true,
                message: '회원 가입 성공',
                result: {
                    email: user.email,
                    account: user.account,
                },
            };
        } catch (e) {
            throw new HttpException(
                {
                    success: false,
                    message: e.message,
                    error: {
                        status: e.status,
                        name: e.name,
                    },
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
