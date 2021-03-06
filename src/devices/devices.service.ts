import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
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
    const countDevices = await this.gatewayService.countTotalDevicesByGatewayId(
      createDeviceDto.gatewayId,
    );

    if (countDevices < 10) {
      const gateway = await this.gatewayService.findById(
        createDeviceDto.gatewayId,
      );

      const device = new this.deviceModel(createDeviceDto);
      const createdDevice = await device.save();

      gateway.devices.push(createdDevice._id);
      await gateway.save();
      return createdDevice;
    }

    throw new BadRequestException(
      'No more that 10 peripheral devices are allowed for a gateway',
    );
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

  async deleteDeviceByIdGateway(deviceId, gatewayId): Promise<Device> {
    try {
      const removedDevice = await this.delete(deviceId);
      await this.gatewayService.removeDeviceFromGateway(gatewayId, deviceId);

      return removedDevice;
    } catch (e) {
      throw new InternalServerErrorException(
        `An error occurred while removing with data (gateway: ${gatewayId} and device: ${deviceId})`,
      );
    }
  }
}
