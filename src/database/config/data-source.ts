import 'dotenv/config';

import { DataSource } from 'typeorm';

import { AuditLogEntity } from '../../modules/audit/entities/audit-log.entity';
import { CourierTokenEntity } from '../../modules/auth/entities/courier-token.entity';
import { BatchEntity } from '../../modules/batch/entities/batch.entity';
import { BatchItemEntity } from '../../modules/batch/entities/batch-item.entity';
import { OrderEntity } from '../../modules/orders/entities/order.entity';
import { TrackingHistoryEntity } from '../../modules/tracking/entities/tracking-history.entity';

export default new DataSource({
    type: 'postgres',

    host: process.env.DB_HOST,

    port: Number(process.env.DB_PORT),

    username: process.env.DB_USERNAME,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_DATABASE,

    synchronize: false,

    logging: false,

    entities: [
        OrderEntity,
        TrackingHistoryEntity,
        BatchEntity,
        BatchItemEntity,
        CourierTokenEntity,
        AuditLogEntity,
    ],

    migrations: ['dist/database/migrations/*.js'],
});