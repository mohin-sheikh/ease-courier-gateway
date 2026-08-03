import { Injectable } from '@nestjs/common';

import { UrbaneboltAuthService } from '../auth/urbanebolt-auth.service';
import { UrbaneboltHttpClient } from '../client/urbanebolt-http.client';
import { ManifestRequestDto } from '../dto/manifest-request.dto';
import { ManifestResponseDto } from '../dto/manifest-response.dto';

@Injectable()
export class ManifestService {
  constructor(
    private readonly authService: UrbaneboltAuthService,
    private readonly httpClient: UrbaneboltHttpClient,
  ) {}

  async createShipment(
    payload: ManifestRequestDto[],
  ): Promise<ManifestResponseDto> {
    const token = await this.authService.getAccessToken();

    return this.httpClient.post<ManifestResponseDto>(
      '/api/v1/services/manifest/',
      payload,
      token,
    );
  }
}
