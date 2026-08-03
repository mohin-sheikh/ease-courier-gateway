import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../shared/database/base.entity';
import { AuditAction } from '../../../common/enums/audit-action.enum';
import { CourierPartner } from '../../../common/enums/courier-partner.enum';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity('audit_logs')
@Index(['requestId'])
@Index(['action'])
export class AuditLogEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'order_id',
  })
  order?: OrderEntity;

  @Column()
  requestId!: string;

  @Column({
    type: 'enum',
    enum: AuditAction,
  })
  action!: AuditAction;

  @Column({
    type: 'enum',
    enum: CourierPartner,
  })
  courier!: CourierPartner;

  @Column()
  status!: string;

  @Column({
    nullable: true,
  })
  durationMs?: number;

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

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  errorPayload?: Record<string, unknown>;
}
