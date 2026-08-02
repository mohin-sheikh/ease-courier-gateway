import {
    Column,
    Entity,
    Index,
    Unique,
} from 'typeorm';

import { BaseEntity } from '../../../shared/database/base.entity';
import { CourierPartner } from '../../../common/enums/courier-partner.enum';
import { OrderStatus } from '../../../common/enums/order-status.enum';

@Entity('orders')
@Unique(['internalOrderId', 'courierPartner'])
@Index(['status'])
@Index(['courierPartner'])
@Index(['courierTrackingNumber'])
export class OrderEntity extends BaseEntity {
    @Column({
        unique: true,
        length: 100,
    })
    internalOrderId!: string;

    @Column({
        type: 'enum',
        enum: CourierPartner,
    })
    courierPartner!: CourierPartner;

    @Column({
        nullable: true,
        length: 100,
    })
    courierShipmentId?: string;

    @Column({
        nullable: true,
        length: 100,
    })
    courierTrackingNumber?: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status!: OrderStatus;

    @Column({
        nullable: true,
        unique: true,
    })
    idempotencyKey?: string;

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    requestPayload?: Record<string, unknown>;

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    responsePayload?: Record<string, unknown>;
}