import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>();
		const status = exception.getStatus();
		const exceptionObj = exception.getResponse(); // ExceptionObj 타입의 객체

		response.status(status).json({
			success: false,
			message: exceptionObj['message'],
			status,
			error: exceptionObj['error'],
			date: new Date().toISOString(), // 2023-10-27T14:30:20.123Z
		});
	}
}
