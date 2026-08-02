import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';

import { OrdersService } from '../services/orders.service';
import { OrderMapper } from '../mappers/order.mapper';

import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderResponseDto } from '../dto/create-order-response.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly mapper: OrderMapper,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateOrderDto,
    ): Promise<CreateOrderResponseDto> {

        const order =
            await this.ordersService.create(dto);

        return this.mapper.toCreateResponse(order);
    }
}