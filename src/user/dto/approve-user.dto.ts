import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumberString, MaxLength, MinLength } from 'class-validator';

export class ApproveUserDto extends OmitType(CreateUserDto, ['email'] as const) {
    @IsNumberString()
    @MinLength(6)
    @MaxLength(6)
    @IsNotEmpty()
    signupCode: string;
}
