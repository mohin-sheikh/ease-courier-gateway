import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from '../../../shared/database/base.entity';
import { BatchProcessingStatus } from '../../../common/enums/batch-processing-status.enum';
import { BatchEntity } from './batch.entity';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity('batch_items')
@Unique(['batch', 'order'])
export class BatchItemEntity extends BaseEntity {
  @ManyToOne(() => BatchEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'batch_id',
  })
  batch!: BatchEntity;

  @ManyToOne(() => OrderEntity, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'order_id',
  })
  order!: OrderEntity;

  @Column({
    type: 'enum',
    enum: BatchProcessingStatus,
    default: BatchProcessingStatus.PENDING,
  })
  processingStatus!: BatchProcessingStatus;

  @Column({
    nullable: true,
    type: 'text',
  })
  errorMessage?: string;
}
