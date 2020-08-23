import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Gateway } from '../gateways/schemas/gateway.schema';
import { GatewaysService } from '../gateways/gateways.service';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private readonly deviceModel: Model<Device>,
    private readonly gatewayService: GatewaysService,
  ) {}

  async findById(id: string): Promise<Device> {
    const device = await this.deviceModel
      .findById(id)
      .populate('gateway')
      .exec();

    if (!device) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }
    return device;
  }

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const gateway: Gateway = await this.gatewayService.findById(
      createDeviceDto.gatewayId,
    );

    const device = new this.deviceModel(createDeviceDto);
    const createdDevice = await device.save();

    gateway.devices.push(createdDevice._id);
    await gateway.save();
    return createdDevice;
  }

  async update(updateDeviceDto: UpdateDeviceDto, id: string): Promise<Device> {
    const device = await this.deviceModel.findOneAndUpdate(
      { _id: id },
      { $set: updateDeviceDto },
      { new: true },
    );

    if (!device) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }

    return device;
  }

  async delete(id: string): Promise<Device> {
    const device = await this.findById(id);
    return await device.remove();
  }
}
