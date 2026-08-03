import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourierTokenEntity } from './entities/courier-token.entity';
import { CourierTokenRepository } from './repositories/courier-token.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CourierTokenEntity])],
  providers: [CourierTokenRepository],
  exports: [CourierTokenRepository],
})
export class CourierSharedModule {}
