import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CouriersModule } from './couriers/couriers.module';
import { SharedModule } from './shared/shared.module';
import { TrackingModule } from './modules/tracking/tracking.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    SharedModule,

    DatabaseModule,

    CouriersModule,

    OrdersModule,

    TrackingModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }