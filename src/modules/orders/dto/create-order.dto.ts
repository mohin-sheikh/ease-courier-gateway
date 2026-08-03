import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { CourierPartner } from '../../../common/enums/courier-partner.enum';

import { CustomerDto } from './customer.dto';
import { AddressDto } from './address.dto';
import { OrderItemDto } from './order-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @IsString()
    internalOrderId!: string;

    @IsEnum(CourierPartner)
    courierPartner!: CourierPartner;

    @ApiProperty({
        required: false,
        example: '4c9f7c8b-1f4a-4a7d-9d8d-123456789abc',
        description: 'Unique key to prevent duplicate order creation.',
    })
    @IsOptional()
    @IsString()
    idempotencyKey?: string;

    @ValidateNested()
    @Type(() => CustomerDto)
    customer!: CustomerDto;

    @ValidateNested()
    @Type(() => AddressDto)
    address!: AddressDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items!: OrderItemDto[];
}