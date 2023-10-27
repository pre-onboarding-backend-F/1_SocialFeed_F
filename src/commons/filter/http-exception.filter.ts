import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionObj } from '../exception.message';
import { Response } from 'express';

export class CustomBadRequestException extends HttpException {
    constructor(exceptionObj: ExceptionObj) {
        super(exceptionObj, HttpStatus.BAD_REQUEST);
    }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        const exceptionObj = exception.getResponse();

        response.status(status).json({
            success: false,
            message: exceptionObj['message'],
            date: new Date(),
        });
    }
}
