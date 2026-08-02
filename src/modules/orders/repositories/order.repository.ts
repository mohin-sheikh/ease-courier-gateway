import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DeepPartial,
    Repository,
} from 'typeorm';

import { OrderEntity } from '../entities/order.entity';
import { CourierPartner } from '../../../common/enums/courier-partner.enum';
import { OrderStatus } from '../../../common/enums/order-status.enum';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly repository: Repository<OrderEntity>,
    ) { }

    async create(
        data: DeepPartial<OrderEntity>,
    ): Promise<OrderEntity> {
        const order = this.repository.create(data);
        return this.repository.save(order);
    }

    async save(
        order: OrderEntity,
    ): Promise<OrderEntity> {
        return this.repository.save(order);
    }

    async findById(
        id: string,
    ): Promise<OrderEntity | null> {
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

    async findByIdempotencyKey(
        idempotencyKey: string,
    ): Promise<OrderEntity | null> {
        return this.repository.findOne({
            where: {
                idempotencyKey,
            },
        });
    }

    async updateStatus(
        id: string,
        status: OrderStatus,
    ): Promise<void> {
        await this.repository.update(id, {
            status,
        });
    }

    async updateShipment(
        id: string,
        courierShipmentId: string,
        courierTrackingNumber: string,
        responsePayload: Record<string, unknown>,
    ): Promise<void> {
        const order = await this.findById(id);

        if (!order) {
            return;
        }

        order.courierShipmentId = courierShipmentId;
        order.courierTrackingNumber = courierTrackingNumber;
        order.responsePayload = responsePayload;
        order.status = OrderStatus.CREATED;

        await this.repository.save(order);
    }
}