import { Injectable } from '@nestjs/common';

import { OrderEntity } from '../entities/order.entity';
import { CreateOrderResponseDto } from '../dto/create-order-response.dto';

@Injectable()
export class OrderMapper {
    toCreateResponse(
        entity: OrderEntity,
    ): CreateOrderResponseDto {
        return {
            success: true,
            orderId: entity.id,
            shipmentId: entity.courierShipmentId,
            awb: entity.courierTrackingNumber,
            status: entity.status,
        };
    }
}