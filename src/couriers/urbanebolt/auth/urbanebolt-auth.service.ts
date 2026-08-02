import { Injectable } from '@nestjs/common';

@Injectable()
export class UrbaneboltAuthService {
    async getValidToken(): Promise<string> {
        throw new Error('Not implemented');
    }
}