import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { ApproveUserDto } from './dto/approve-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async isUserExist(options: FindOptionsWhere<User>): Promise<boolean> {
        return this.userRepository.exist({
            where: options,
        });
    }

    async findOne(options: FindOptionsWhere<User>): Promise<User | null> {
        return await this.userRepository.findOne({ where: options });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { account, password, email } = createUserDto;

        const isExist = await this.isUserExist({ account });

        if (isExist) {
            throw new BadRequestException('이미 회원가입 되어있는 계정입니다.');
        }

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

        if (!user) throw new BadRequestException('존재하지 않는 계정입니다.');

        if (user.isCertify) throw new BadRequestException('이미 가입승인된 계정입니다.');

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new BadRequestException('패스워드가 일치하지 않습니다.');

        const isSignupCodeMatched = user.signUpCode === parseInt(signupCode);

        if (!isSignupCodeMatched) throw new BadRequestException('인증코드가 일치하지 않습니다.');

        await this.userRepository.update({ id: user.id }, { isCertify: true });

        return {
            success: true,
            message: '회원 가입 승인 되었습니다.',
            result: null,
        };
    }
}
