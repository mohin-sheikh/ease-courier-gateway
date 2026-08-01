import { Injectable } from '@nestjs/common';

@Injectable()
export class UrbaneboltAuthClient {
    async authenticate(): Promise<void> {
        throw new Error('Not implemented');
    }
}