import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { ApproveUserDto } from './dto/approve-user.dto';
import { UsersException } from 'src/commons/exception.message';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async isUserExist(options: FindOptionsWhere<User>): Promise<boolean> {
        return this.userRepository.exist({ where: options });
    }

    async findOne(options: FindOptionsWhere<User>): Promise<User | null> {
        return await this.userRepository.findOne({ where: options });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { account, password, email } = createUserDto;

        const isExist = await this.isUserExist({ account });
        if (isExist) throw new BadRequestException(UsersException.USER_ACCOUNT_ALREADY_EXISTS);

        const signUpCode = this.generateSignUpCode();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            account,
            password: hashedPassword,
            email,
            signUpCode,
        });

        await this.userRepository.save(newUser);

        newUser.createdAt = undefined;
        newUser.updatedAt = undefined;
        newUser.id = undefined;

        return newUser;
    }

    generateSignUpCode() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async approveUser(approveUserDto: ApproveUserDto) {
        const { account, password, signupCode } = approveUserDto;

        const user = await this.findOne({ account });
        if (!user) throw new BadRequestException(UsersException.USER_NOT_EXISTS);

        if (user.isCertify) throw new BadRequestException(UsersException.USER_ALREADY_CERTIFIED);

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new BadRequestException(UsersException.USER_PASSWORD_NOT_MATCHED);

        const isSignupCodeMatched = user.signUpCode === parseInt(signupCode);
        if (!isSignupCodeMatched) throw new BadRequestException(UsersException.USER_SIGNUPCODE_NOT_MATCHED);

        await this.userRepository.update({ id: user.id }, { isCertify: true });

        return {
            success: true,
            message: '회원 가입 승인 되었습니다.',
            result: null,
        };
    }
}
