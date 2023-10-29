import { JsonWebTokenError } from 'jsonwebtoken';

export class InvalidTokenError extends JsonWebTokenError {
    constructor() {
        super('만료됐거나 유효하지 않은 토큰입니다.');
        this.name = 'InvalidToken';
    }
}
