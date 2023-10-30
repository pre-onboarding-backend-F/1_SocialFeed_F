import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumberString, MaxLength, MinLength } from 'class-validator';

export class ApproveUserDto extends OmitType(CreateUserDto, ['email'] as const) {
	@IsNumberString()
	@MinLength(6, {
		message: '가입승인코드는 6자리입니다.',
	})
	@MaxLength(6, {
		message: '가입승인코드는 6자리입니다.',
	})
	@IsNotEmpty()
	signupCode: string;
}
