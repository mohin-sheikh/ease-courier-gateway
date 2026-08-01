import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CourierPartner } from '../../../common/enums/courier-partner.enum';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly repository: Repository<OrderEntity>,
    ) { }

    async create(order: Partial<OrderEntity>): Promise<OrderEntity> {
        const entity = this.repository.create(order);
        return this.repository.save(entity);
    }

    async findById(id: string): Promise<OrderEntity | null> {
        return this.repository.findOne({
            where: { id },
        });
    }

    async findByInternalOrderId(
        internalOrderId: string,
        courierPartner: CourierPartner,
    ): Promise<OrderEntity | null> {
        return this.repository.findOne({
            where: {
                internalOrderId,
                courierPartner,
            },
        });
    }

    async update(order: OrderEntity): Promise<OrderEntity> {
        return this.repository.save(order);
    }
}