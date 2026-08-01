import { Injectable } from '@nestjs/common';

import { CourierAdapter } from '../interfaces/courier.interface';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { CreateShipmentResponseDto } from '../dto/create-shipment-response.dto';

@Injectable()
export class UrbaneboltAdapter implements CourierAdapter {

    async createShipment(
        dto: CreateShipmentDto,
    ): Promise<CreateShipmentResponseDto> {

        throw new Error('Not implemented.');

    }

}