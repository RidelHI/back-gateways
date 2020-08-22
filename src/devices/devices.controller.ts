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
  @Post(':id')
  async create(
    @Body() createDeviceDto: CreateDeviceDto,
    @Param('id') idGateway: string,
  ) {
    return await this.devicesService.create(createDeviceDto, idGateway);
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
}
