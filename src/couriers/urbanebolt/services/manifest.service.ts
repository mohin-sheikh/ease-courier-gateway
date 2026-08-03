import { Injectable } from '@nestjs/common';

import { UrbaneboltAuthService } from '../auth/urbanebolt-auth.service';
import { UrbaneboltHttpClient } from '../client/urbanebolt-http.client';

@Injectable()
export class ManifestService {
    constructor(
        private readonly authService: UrbaneboltAuthService,
        private readonly httpClient: UrbaneboltHttpClient,
    ) { }

    async createShipment(
        payload: Record<string, unknown>,
    ): Promise<Record<string, unknown>> {

        const token =
            await this.authService.getAccessToken();

        return this.httpClient.post(
            '/api/v1/services/manifest/',
            payload,
            token,
        );
    }
}