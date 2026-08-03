import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Application health check',
    description:
      'Returns the current health status of the Ease Courier Gateway.',
  })
  health() {
    return {
      success: true,
      status: 'UP',
      service: 'Ease Courier Gateway',
      timestamp: new Date().toISOString(),
    };
  }
}
