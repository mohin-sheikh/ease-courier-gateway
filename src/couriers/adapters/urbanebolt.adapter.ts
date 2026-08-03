import { Injectable } from '@nestjs/common';

import { CourierInterface } from '../interfaces/courier.interface';
import { CreateOrderDto } from '../../modules/orders/dto/create-order.dto';
import { CreateShipmentResponseDto } from '../dto/create-shipment-response.dto';

@Injectable()
export class UrbaneboltAdapter implements CourierInterface {

    async createShipment(
        dto: CreateOrderDto,
    ): Promise<CreateShipmentResponseDto> {

        return {
            shipmentId: '',
            trackingNumber: '',
            rawResponse: {},
        };
    }

    async trackShipment(): Promise<unknown> {
        return {};
    }

    async cancelShipment(): Promise<void> {
        return;
    }
}