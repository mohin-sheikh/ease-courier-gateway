import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { OrderEntity } from '../entities/order.entity';
import { CourierPartner } from '../../../common/enums/courier-partner.enum';
import { OrderStatus } from '../../../common/enums/order-status.enum';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
  ) {}

  async create(data: DeepPartial<OrderEntity>): Promise<OrderEntity> {
    const order = this.repository.create(data);
    return this.repository.save(order);
  }

  async save(order: OrderEntity): Promise<OrderEntity> {
    return this.repository.save(order);
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

  async findByIdempotencyKey(
    idempotencyKey: string,
  ): Promise<OrderEntity | null> {
    return this.repository.findOne({
      where: {
        idempotencyKey,
      },
    });
  }

  async updateStatus(id: string, status: OrderStatus): Promise<void> {
    await this.repository.update(id, {
      status,
    });
  }

  async updateShipment(
    id: string,
    shipmentId: string,
    awbNumber: string,
    trackingNumber: string,
    responsePayload: unknown,
  ): Promise<void> {
    const order = await this.findById(id);

    if (!order) {
      throw new Error(`Order ${id} not found.`);
    }

    order.courierShipmentId = shipmentId;

    order.awbNumber = awbNumber;

    order.courierTrackingNumber = trackingNumber;

    order.responsePayload = responsePayload as Record<string, unknown>;

    await this.repository.save(order);
  }

  async findByTrackingNumber(
    trackingNumber: string,
  ): Promise<OrderEntity | null> {
    return this.repository.findOne({
      where: {
        courierTrackingNumber: trackingNumber,
      },
    });
  }
}
