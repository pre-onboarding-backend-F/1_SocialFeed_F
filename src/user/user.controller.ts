import { Body, ClassSerializerInterceptor, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApproveUserDto } from './dto/approve-user.dto';
import { HttpExceptionFilter } from 'src/commons/filter/http-exception.filter';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        //try {
        //    const user = await this.userService.createUser(createUserDto);
        //    return {
        //        success: true,
        //        message: '회원 가입 성공',
        //        result: {
        //            email: user.email,
        //            account: user.account,
        //        },
        //    };
        //} catch (e) {
        //    throw new HttpException(
        //        {
        //            success: false,
        //            message: e.message,
        //            error: {
        //                status: e.status,
        //                name: e.name,
        //            },
        //        },
        //        HttpStatus.BAD_REQUEST,
        //    );
        //}

        return await this.userService.createUser(createUserDto);
    }

    @Post('approve')
    async approveUser(@Body() approveUserDto: ApproveUserDto) {
        //try {
        //    return await this.userService.approveUser(approveUserDto);
        //} catch (e) {
        //    throw new HttpException(
        //        {
        //            success: false,
        //            message: e.message,
        //            error: {
        //                status: e.status,
        //                name: e.name,
        //            },
        //            date: new Date(),
        //        },
        //        HttpStatus.BAD_REQUEST,
        //    );
        //}

        return await this.userService.approveUser(approveUserDto);
    }
}
