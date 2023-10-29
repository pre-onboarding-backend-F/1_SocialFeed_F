import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvalidTokenError } from '../errors/jwt-errors';

@Injectable()
export class AtGuard extends AuthGuard('jwt-access-token') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any) {
        if (!user) throw new InvalidTokenError();
        return user;
    }
}
