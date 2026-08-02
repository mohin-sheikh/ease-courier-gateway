import {
    ConflictException,
    Injectable,
} from '@nestjs/common';

import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderRepository: OrderRepository,
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

        return this.orderRepository.create({
            internalOrderId: dto.internalOrderId,
            courierPartner: dto.courierPartner,
            requestPayload: JSON.parse(
                JSON.stringify(dto),
            ),
        });
    }
}