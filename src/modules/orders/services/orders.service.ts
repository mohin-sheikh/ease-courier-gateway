import {
    ConflictException,
    Injectable,
} from '@nestjs/common';

import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';

import { CourierFactory } from '../../../couriers/factory/courier.factory';
import { OrderStatus } from '../../../common/enums/order-status.enum';

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly courierFactory: CourierFactory,
    ) { }

    async create(
        dto: CreateOrderDto,
    ): Promise<OrderEntity> {

        if (dto.idempotencyKey) {

            const existingByKey =
                await this.orderRepository.findByIdempotencyKey(
                    dto.idempotencyKey,
                );

            if (existingByKey) {
                return existingByKey;
            }
        }

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
                idempotencyKey: dto.idempotencyKey,
                status: OrderStatus.PENDING,
                requestPayload: JSON.parse(
                    JSON.stringify(dto),
                ),
            });

        try {

            const courier =
                this.courierFactory.getCourier(
                    dto.courierPartner,
                );

            const shipment =
                await courier.createShipment(dto);

            await this.orderRepository.updateShipment(
                order.id,
                shipment.shipmentId,
                shipment.awbNumber,
                shipment.trackingNumber,
                shipment.rawResponse,
            );

            await this.orderRepository.updateStatus(
                order.id,
                OrderStatus.CREATED,
            );

        } catch (error) {

            await this.orderRepository.updateStatus(
                order.id,
                OrderStatus.FAILED,
            );

            throw error;
        }

        return (await this.orderRepository.findById(order.id))!;
    }
}