import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CourierPartner } from '../../../common/enums/courier-partner.enum';

import { CustomerDto } from './customer.dto';
import { AddressDto } from './address.dto';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {

    @ApiProperty({
        example: 'ORDER-10001',
    })
    @IsString()
    internalOrderId!: string;

    @ApiProperty({
        enum: CourierPartner,
        example: CourierPartner.URBANEBOLT,
    })
    @IsEnum(CourierPartner)
    courierPartner!: CourierPartner;

    @ApiProperty({
        required: false,
        example: '4c9f7c8b-1f4a-4a7d-9d8d-123456789abc',
    })
    @IsOptional()
    @IsString()
    idempotencyKey?: string;

    @ApiProperty({
        type: CustomerDto,
    })
    @ValidateNested()
    @Type(() => CustomerDto)
    customer!: CustomerDto;

    @ApiProperty({
        type: AddressDto,
    })
    @ValidateNested()
    @Type(() => AddressDto)
    address!: AddressDto;

    @ApiProperty({
        type: [OrderItemDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items!: OrderItemDto[];
}