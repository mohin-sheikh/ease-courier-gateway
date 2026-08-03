import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from '../../../modules/orders/dto/create-order.dto';
import { ManifestRequestDto } from '../dto/manifest-request.dto';

@Injectable()
export class UrbaneboltManifestMapper {
  map(dto: CreateOrderDto): ManifestRequestDto[] {
    return [
      {
        customerCode: process.env.URBANEBOLT_CUSTOMER_CODE ?? '',

        orderNumber: dto.internalOrderId,

        courierPartner: dto.courierPartner,

        customer: dto.customer,

        address: dto.address,

        items: dto.items,
      },
    ];
  }
}
