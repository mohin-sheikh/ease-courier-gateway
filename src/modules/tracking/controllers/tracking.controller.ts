import { Controller, Get, Param } from '@nestjs/common';

import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { TrackingService } from '../services/tracking.service';
import { TrackingResponseDto } from '../dto/tracking-response.dto';

@ApiTags('Tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get(':trackingNumber')
  @ApiOperation({
    summary: 'Track shipment',
  })
  @ApiParam({
    name: 'trackingNumber',
  })
  @ApiOkResponse({
    type: TrackingResponseDto,
  })
  async track(
    @Param('trackingNumber')
    trackingNumber: string,
  ): Promise<TrackingResponseDto> {
    return this.trackingService.getTracking(trackingNumber);
  }
}
