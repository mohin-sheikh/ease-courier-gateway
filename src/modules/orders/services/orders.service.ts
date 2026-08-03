import {
    ConflictException,
    Injectable,
} from '@nestjs/common';

import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';
import { CourierFactory } from '../../../couriers/factory/courier.factory';

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly courierFactory: CourierFactory,
    ) { }

    async create(
        dto: CreateOrderDto,
    ): Promise<OrderEntity> {

        const existing =
            await this.orderRepository.findByInternalOrderId(
                dto.internalOrderId,
                dto.courierPartner,
            );

        if (existing) {
            throw new ConflictException(
                'Order already exists.',
            );
        }

        const order =
            await this.orderRepository.create({
                internalOrderId: dto.internalOrderId,
                courierPartner: dto.courierPartner,
                requestPayload: JSON.parse(
                    JSON.stringify(dto),
                ),
            });

        const courier =
            this.courierFactory.getCourier(
                dto.courierPartner,
            );

        const shipment =
            await courier.createShipment(dto);

        await this.orderRepository.updateShipment(
            order.id,
            shipment.shipmentId,
            shipment.trackingNumber,
            shipment.rawResponse,
        );

        return (
            await this.orderRepository.findById(
                order.id,
            )
        )!;
    }
}