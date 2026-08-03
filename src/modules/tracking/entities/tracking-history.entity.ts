import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import { BaseEntity } from '../../../shared/database/base.entity';
import { OrderEntity } from '../../orders/entities/order.entity';
import { OrderStatus } from '../../../common/enums/order-status.enum';

@Entity('tracking_history')
@Index(['order'])
@Index(['status'])
export class TrackingHistoryEntity extends BaseEntity {

    @ManyToOne(() => OrderEntity, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({
        name: 'order_id',
    })
    order!: OrderEntity;

    @Column({
        type: 'enum',
        enum: OrderStatus,
    })
    status!: OrderStatus;

    @Column({
        nullable: true,
        length: 255,
    })
    location?: string;

    @Column({
        nullable: true,
        type: 'text',
    })
    remarks?: string;

    @Column({
        nullable: true,
        type: 'timestamptz',
    })
    courierTimestamp?: Date;

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    rawPayload?: Record<string, unknown>;
}