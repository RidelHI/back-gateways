import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { Gateway } from './schemas/gateway.schema';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Gateways')
@Controller('gateways')
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  async findAll(): Promise<Gateway[]> {
    return this.gatewaysService.findAll();
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  async create(@Body() createGatewayDto: CreateGatewayDto) {
    await this.gatewaysService.create(createGatewayDto);
  }
}
