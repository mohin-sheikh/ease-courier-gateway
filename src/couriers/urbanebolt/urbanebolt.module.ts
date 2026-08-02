import { Module } from '@nestjs/common';

import { UrbaneboltApiClient } from './client/urbanebolt-api.client';
import { UrbaneboltAuthClient } from './auth/urbanebolt-auth.client';

@Module({
    providers: [
        UrbaneboltApiClient,
        UrbaneboltAuthClient,
    ],
    exports: [
        UrbaneboltApiClient,
        UrbaneboltAuthClient,
    ],
})
export class UrbaneboltModule { }