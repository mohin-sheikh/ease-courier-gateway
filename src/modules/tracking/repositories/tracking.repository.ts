import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrackingHistoryEntity } from '../entities/tracking-history.entity';

@Injectable()
export class TrackingRepository {
  constructor(
    @InjectRepository(TrackingHistoryEntity)
    private readonly repository: Repository<TrackingHistoryEntity>,
  ) {}

  async save(entity: TrackingHistoryEntity): Promise<TrackingHistoryEntity> {
    return this.repository.save(entity);
  }

  async findByOrderId(orderId: string): Promise<TrackingHistoryEntity[]> {
    return this.repository.find({
      where: {
        order: {
          id: orderId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
