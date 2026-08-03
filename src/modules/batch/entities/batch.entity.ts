import { Column, Entity, Index, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../shared/database/base.entity';
import { BatchStatus } from '../../../common/enums/batch-status.enum';
import { BatchItemEntity } from './batch-item.entity';

@Entity('batches')
@Index(['status'])
export class BatchEntity extends BaseEntity {
  @Column({
    unique: true,
    length: 100,
  })
  batchNumber!: string;

  @Column({
    type: 'enum',
    enum: BatchStatus,
    default: BatchStatus.PENDING,
  })
  status!: BatchStatus;

  @Column()
  totalOrders!: number;

  @Column({
    default: 0,
  })
  processedOrders!: number;

  @Column({
    default: 0,
  })
  successCount!: number;

  @Column({
    default: 0,
  })
  failureCount!: number;

  @Column({
    nullable: true,
    type: 'timestamptz',
  })
  completedAt?: Date;

  @OneToMany(() => BatchItemEntity, (item) => item.batch)
  items!: BatchItemEntity[];
}
