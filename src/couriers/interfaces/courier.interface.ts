import { CreateOrderDto } from '../../modules/orders/dto/create-order.dto';
import { CreateShipmentResponseDto } from '../dto/create-shipment-response.dto';

export interface CourierInterface {

    createShipment(
        dto: CreateOrderDto,
    ): Promise<CreateShipmentResponseDto>;

    trackShipment(
        shipmentId: string,
    ): Promise<unknown>;

    cancelShipment(
        shipmentId: string,
    ): Promise<void>;
}