import {
    Column,
    Entity,
} from 'typeorm';

import { BaseEntity } from '../../../shared/database/base.entity';
import { CourierPartner } from '../../../common/enums/courier-partner.enum';

@Entity('courier_tokens')
export class CourierTokenEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: CourierPartner,
        unique: true,
    })
    courier!: CourierPartner;

    @Column({
        type: 'text',
    })
    accessToken!: string;

    @Column({
        type: 'timestamptz',
    })
    expiresAt!: Date;
}