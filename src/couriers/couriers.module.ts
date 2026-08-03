import { Module } from '@nestjs/common';

import { CourierFactory } from './factory/courier.factory';
import { UrbaneboltAdapter } from './adapters/urbanebolt.adapter';
import { UrbaneboltModule } from './urbanebolt/urbanebolt.module';

@Module({
    imports: [
        UrbaneboltModule,
    ],
    providers: [
        CourierFactory,
        UrbaneboltAdapter,
    ],
    exports: [
        CourierFactory,
    ],
})
export class CouriersModule { }