import { Module } from '@nestjs/common';

import { UrbaneboltApiClient } from './client/urbanebolt-api.client';
import { UrbaneboltHttpClient } from './client/urbanebolt-http.client';

import { UrbaneboltAuthClient } from './auth/urbanebolt-auth.client';
import { UrbaneboltAuthService } from './auth/urbanebolt-auth.service';

import { ManifestService } from './services/manifest.service';
import { UrbaneboltManifestMapper } from './mapper/urbanebolt-manifest.mapper';

import { CourierSharedModule } from '../shared/courier-shared.module';

@Module({
    imports: [
        CourierSharedModule,
    ],
    providers: [
        UrbaneboltApiClient,
        UrbaneboltHttpClient,
        UrbaneboltAuthClient,
        UrbaneboltAuthService,
        ManifestService,
        UrbaneboltManifestMapper,
    ],
    exports: [
        UrbaneboltApiClient,
        UrbaneboltHttpClient,
        UrbaneboltAuthClient,
        UrbaneboltAuthService,
        ManifestService,
        UrbaneboltManifestMapper,
    ],
})
export class UrbaneboltModule { }