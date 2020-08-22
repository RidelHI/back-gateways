import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { Gateway } from './schemas/gateway.schema';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { Device } from '../devices/schemas/device.schema';

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
  @ApiNotFoundResponse({description: 'No Found Gateway by Id'})
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Gateway> {
    return this.gatewaysService.findById(id);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({description: 'No Found Gateway by Id'})
  @Get(':id/devices')
  async findDevicesFromGateway(@Param('id') id: string): Promise<Device[]> {
    return await this.gatewaysService.findDevicesFromGateway(id);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  async create(@Body() createGatewayDto: CreateGatewayDto) {
    return await this.gatewaysService.create(createGatewayDto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({description: 'No Found Gateway by Id'})
  @Put(':id')
  async update(
    @Body() updateGatewayDto: UpdateGatewayDto,
    @Param('id') id: string,
  ): Promise<Gateway> {
    return await this.gatewaysService.update(updateGatewayDto, id);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({description: 'No Found Gateway by Id'})
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Gateway> {
    return await this.gatewaysService.delete(id);
  }
}
