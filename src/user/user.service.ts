import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async checkUser(account: string): Promise<User|null> {
        return this.userRepository.findOne({ where: { account }});

    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { account, password, email } = createUserDto;

        const existingUser = await this.checkUser(account);
        if(existingUser) { 
            throw new BadRequestException('이미 회원가입 되어있는 계정입니다.');
        }

        const min = 100000;
        const max = 999999;
        const signUpCode = Math.floor(Math.random() * (max - min + 1) + min);
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            account,
            password: hashedPassword,
            email,
            signUpCode: signUpCode
        });

        return await this.userRepository.save(newUser);

        
    }
    
}
