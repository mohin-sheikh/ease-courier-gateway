import { Injectable } from '@nestjs/common';

@Injectable()
export class UrbaneboltAuthService {
    async getAccessToken(): Promise<string> {
        /**
         * Phase 1
         * Return a dummy token.
         *
         * Phase 2
         * Redis
         * ↓
         * Database
         * ↓
         * Login API
         */

        return 'dummy-token';
    }
}