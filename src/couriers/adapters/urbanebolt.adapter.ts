import { Injectable } from '@nestjs/common';

import { CourierInterface } from '../interfaces/courier.interface';
import { CreateOrderDto } from '../../modules/orders/dto/create-order.dto';
import { CreateShipmentResponseDto } from '../dto/create-shipment-response.dto';
import { UrbaneboltAuthService } from '../urbanebolt/auth/urbanebolt-auth.service';
import { UrbaneboltHttpClient } from '../urbanebolt/client/urbanebolt-http.client';
import { ManifestService } from '../urbanebolt/services/manifest.service';
import { UrbaneboltManifestMapper } from '../urbanebolt/mapper/urbanebolt-manifest.mapper';

@Injectable()
export class UrbaneboltAdapter implements CourierInterface {
    constructor(
        private readonly mapper: UrbaneboltManifestMapper,
        private readonly manifestService: ManifestService,
    ) { }

    async createShipment(
        dto: CreateOrderDto,
    ): Promise<CreateShipmentResponseDto> {

        const payload = this.mapper.map(dto);

        const response =
            await this.manifestService.createShipment(
                payload,
            );

        console.log(
            'Urbanebolt Manifest Response:',
            JSON.stringify(response, null, 2),
        );

        return {
            shipmentId: '',
            trackingNumber: '',
            rawResponse: response,
        };
    }

    async trackShipment(): Promise<unknown> {
        return {};
    }

    async cancelShipment(): Promise<void> {
        return;
    }
}