import { Injectable, NotFoundException } from '@nestjs/common';

import { OrderRepository } from '../../orders/repositories/order.repository';
import { TrackingResponseDto } from '../dto/tracking-response.dto';

@Injectable()
export class TrackingService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getTracking(trackingNumber: string): Promise<TrackingResponseDto> {
    const order =
      await this.orderRepository.findByTrackingNumber(trackingNumber);

    if (!order) {
      throw new NotFoundException('Shipment not found.');
    }

    return {
      trackingNumber: order.courierTrackingNumber ?? '',

      shipmentId: order.courierShipmentId ?? '',

      status: order.status,

      courierStatus: order.courierStatus,
    };
  }
}
