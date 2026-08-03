import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import { OrderMapper } from '../mappers/order.mapper';

import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderResponseDto } from '../dto/create-order-response.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly mapper: OrderMapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new shipment',
    description: 'Creates an order and forwards it to the configured courier.',
  })
  @ApiBody({
    type: CreateOrderDto,
  })
  @ApiCreatedResponse({
    description: 'Order created successfully.',
    type: CreateOrderResponseDto,
  })
  async create(@Body() dto: CreateOrderDto): Promise<CreateOrderResponseDto> {
    const order = await this.ordersService.create(dto);

    return this.mapper.toCreateResponse(order);
  }
}
