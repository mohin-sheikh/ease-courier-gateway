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
import { BulkCreateOrderDto } from '../dto/bulk-create-order.dto';
import { BulkCreateOrderResponseDto } from '../dto/bulk-create-order-response.dto';

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

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create multiple shipments',
    description: 'Creates up to 100 shipments concurrently.',
  })
  @ApiBody({
    type: BulkCreateOrderDto,
  })
  @ApiCreatedResponse({
    description: 'Bulk order processing completed.',
    type: BulkCreateOrderResponseDto,
  })
  async createBulk(
    @Body() dto: BulkCreateOrderDto,
  ): Promise<BulkCreateOrderResponseDto> {
    const result = await this.ordersService.createBulk(dto.orders);

    return {
      total: dto.orders.length,

      success: result.successfulOrders.length,

      failed: result.failedOrders.length,

      successfulOrders: result.successfulOrders.map((order) =>
        this.mapper.toCreateResponse(order),
      ),

      failedOrders: result.failedOrders,
    };
  }
}
