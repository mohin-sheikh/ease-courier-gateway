import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CourierTokenEntity } from '../entities/courier-token.entity';
import { CourierPartner } from '../../../common/enums/courier-partner.enum';

@Injectable()
export class CourierTokenRepository {
    constructor(
        @InjectRepository(CourierTokenEntity)
        private readonly repository: Repository<CourierTokenEntity>,
    ) { }

    async findByCourier(
        courier: CourierPartner,
    ): Promise<CourierTokenEntity | null> {
        return this.repository.findOne({
            where: {
                courier,
            },
        });
    }

    async save(
        token: CourierTokenEntity,
    ): Promise<CourierTokenEntity> {
        return this.repository.save(token);
    }
}