import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { CreateShipmentResponseDto } from '../dto/create-shipment-response.dto';

export interface CourierAdapter {
    createShipment(
        dto: CreateShipmentDto,
    ): Promise<CreateShipmentResponseDto>;
}