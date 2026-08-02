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

export class CreateOrderDto {
    @IsString()
    internalOrderId!: string;

    @IsEnum(CourierPartner)
    courierPartner!: CourierPartner;

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