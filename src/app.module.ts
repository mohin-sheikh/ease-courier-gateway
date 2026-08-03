import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CouriersModule } from './couriers/couriers.module';
import { SharedModule } from './shared/shared.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }