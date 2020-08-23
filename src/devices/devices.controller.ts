import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Device } from './schemas/device.schema';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'No Found Device by Id' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Device> {
    return this.devicesService.findById(id);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.devicesService.create(createDeviceDto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'No Found Device by Id' })
  @Put(':id')
  async update(
    @Body() updateDeviceDto: UpdateDeviceDto,
    @Param('id') id: string,
  ): Promise<Device> {
    return await this.devicesService.update(updateDeviceDto, id);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'No Found Device by Id' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Device> {
    return await this.devicesService.delete(id);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'No Found Device by Id' })
  @Delete(':deviceId/gateways/:gatewayId')
  async deleteDeviceByIdGateway(
    @Param('deviceId') deviceId: string,
    @Param('gatewayId') gatewayId: string,
  ): Promise<Device> {
    return await this.devicesService.deleteDeviceByIdGateway(
      deviceId,
      gatewayId,
    );
  }
}
