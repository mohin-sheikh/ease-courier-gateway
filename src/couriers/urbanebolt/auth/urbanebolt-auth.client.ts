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
  ) {}

  async authenticate(): Promise<UrbaneboltAuthResponseDto> {
    const username = this.configService.get<string>('URBANEBOLT_USERNAME');
    const password = this.configService.get<string>('URBANEBOLT_PASSWORD');

    if (!username || !password) {
      throw new Error('Urbanebolt credentials are not configured.');
    }

    const payload: UrbaneboltAuthRequestDto = {
      username,
      password,
    };

    return this.httpClient.post<UrbaneboltAuthResponseDto>(
      '/api/v1/auth/getToken/',
      payload,
    );
  }
}
