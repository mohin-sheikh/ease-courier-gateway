import {
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { CourierPartner } from '../../../common/enums/courier-partner.enum';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    internalOrderId!: string;

    @IsEnum(CourierPartner)
    courierPartner!: CourierPartner;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    idempotencyKey?: string;

    @IsObject()
    payload!: Record<string, unknown>;
}