import { Module } from '@nestjs/common';

import { UrbaneboltApiClient } from './client/urbanebolt-api.client';
import { UrbaneboltHttpClient } from './client/urbanebolt-http.client';

import { UrbaneboltAuthClient } from './auth/urbanebolt-auth.client';
import { UrbaneboltAuthService } from './auth/urbanebolt-auth.service';

import { ManifestService } from './services/manifest.service';

@Module({
    providers: [
        UrbaneboltApiClient,
        UrbaneboltHttpClient,
        UrbaneboltAuthClient,
        UrbaneboltAuthService,
        ManifestService,
    ],
    exports: [
        UrbaneboltApiClient,
        UrbaneboltHttpClient,
        UrbaneboltAuthClient,
        UrbaneboltAuthService,
        ManifestService,
    ],
})
export class UrbaneboltModule { }