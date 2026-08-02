import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UrbaneboltHttpClient } from '../client/urbanebolt-http.client';
import { UrbaneboltAuthRequestDto } from './dto/urbanebolt-auth-request.dto';
import { UrbaneboltAuthResponseDto } from './dto/urbanebolt-auth-response.dto';

@Injectable()
export class UrbaneboltAuthClient {
    constructor(
        private readonly httpClient: UrbaneboltHttpClient,
        private readonly configService: ConfigService,
    ) { }

    async authenticate(): Promise<UrbaneboltAuthResponseDto> {
        const payload: UrbaneboltAuthRequestDto = {
            username: this.configService.getOrThrow(
                'URBANEBOLT_USERNAME',
            ),
            password: this.configService.getOrThrow(
                'URBANEBOLT_PASSWORD',
            ),
        };

        const { data } =
            await this.httpClient.post<UrbaneboltAuthResponseDto>(
                '/api/v1/auth/getToken/',
                payload,
            );

        return data;
    }
}