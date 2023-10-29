import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvalidTokenError } from '../errors/jwt-errors';

@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh-token') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any) {
        if (!user) throw new InvalidTokenError();
        return user;
    }
}
