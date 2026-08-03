import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from './entities/order.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrderRepository } from './repositories/order.repository';
import { OrderMapper } from './mappers/order.mapper';
import { CouriersModule } from '../../couriers/couriers.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), CouriersModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, OrderMapper],
  exports: [OrderRepository],
})
export class OrdersModule {}
