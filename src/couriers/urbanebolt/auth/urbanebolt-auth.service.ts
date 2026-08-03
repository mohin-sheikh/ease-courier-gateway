import { Injectable } from '@nestjs/common';

import { RedisService } from '../../shared/redis/redis.service';
import { UrbaneboltAuthClient } from './urbanebolt-auth.client';

@Injectable()
export class UrbaneboltAuthService {
    private readonly CACHE_KEY =
        'urbanebolt:access-token';

    constructor(
        private readonly redisService: RedisService,
        private readonly authClient: UrbaneboltAuthClient,
    ) { }

    async getAccessToken(): Promise<string> {

        const cached =
            await this.redisService.get(
                this.CACHE_KEY,
            );

        if (cached) {

            console.log(
                'Urbanebolt token loaded from Redis',
            );

            return cached;
        }

        console.log(
            'Authenticating with Urbanebolt...',
        );

        const response =
            await this.authClient.authenticate();

        /**
         * We'll extract the token once we
         * know the exact response format.
         */

        const token = 'TEMP_TOKEN';

        await this.redisService.set(
            this.CACHE_KEY,
            token,
            3600,
        );

        return token;
    }
}