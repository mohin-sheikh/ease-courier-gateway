import { Injectable, ConflictException } from '@nestjs/common';

import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderRepository: OrderRepository,
    ) { }

    async create(dto: CreateOrderDto): Promise<OrderEntity> {
        const existing =
            await this.orderRepository.findByInternalOrderId(
                dto.internalOrderId,
                dto.courierPartner,
            );

        if (existing) {
            throw new ConflictException(
                'Order already exists for this courier.',
            );
        }

        return this.orderRepository.create({
            internalOrderId: dto.internalOrderId,
            courierPartner: dto.courierPartner,
            idempotencyKey: dto.idempotencyKey,
        });
    }
}