import { OrderEntity } from '../entities/order.entity';
import { OrderResponseDto } from '../dto/order-response.dto';

export class OrderMapper {
    static toResponse(entity: OrderEntity): OrderResponseDto {
        return {
            id: entity.id,
            internalOrderId: entity.internalOrderId,
            courierPartner: entity.courierPartner,
            courierShipmentId: entity.courierShipmentId,
            courierTrackingNumber: entity.courierTrackingNumber,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}