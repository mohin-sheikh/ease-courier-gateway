import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackingHistoryEntity } from './entities/tracking-history.entity';

import { TrackingController } from './controllers/tracking.controller';
import { TrackingService } from './services/tracking.service';
import { TrackingRepository } from './repositories/tracking.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackingHistoryEntity,
    ]),
  ],
  controllers: [
    TrackingController,
  ],
  providers: [
    TrackingService,
    TrackingRepository,
  ],
  exports: [
    TrackingService,
  ],
})
export class TrackingModule { }