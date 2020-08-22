import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gateway } from './schemas/gateway.schema';
import { Model } from 'mongoose';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';

@Injectable()
export class GatewaysService {
  constructor(
    @InjectModel(Gateway.name) private readonly gatewayModel: Model<Gateway>,
  ) {}

  async findAll(): Promise<Gateway[]> {
    return this.gatewayModel
      .find()
      .populate('devices')
      .exec();
  }

  async findById(id: string): Promise<Gateway> {
    const gateway = await this.gatewayModel
      .findById(id)
      .populate('devices')
      .exec();
    if (!gateway) {
      throw new NotFoundException(`Gateway with id ${id} not found`);
    }

    return gateway;
  }

  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    const createdGateway = new this.gatewayModel(createGatewayDto);

    const findGateway = await this.gatewayModel.find({
      serialNumber: createGatewayDto.serialNumber,
    });
    if (findGateway) {
      throw new BadRequestException(
        `There is already a Gateway with a serial number: ${createGatewayDto.serialNumber}`,
      );
    }

    return await createdGateway.save();
  }

  async update(
    updateGatewayDto: UpdateGatewayDto,
    id: string,
  ): Promise<Gateway> {
    const gateway = await this.gatewayModel.findOneAndUpdate(
      { _id: id },
      { $set: updateGatewayDto },
      { new: true },
    );

    if (!gateway) {
      throw new NotFoundException(`Gateway with id ${id} not found`);
    }

    return gateway;
  }

  async delete(id: string): Promise<Gateway> {
    const gateway = await this.findById(id);
    return await gateway.remove();
  }

  async findDevicesFromGateway(id: string): Promise<any> {
    const gateway = await this.findById(id);
    return gateway.devices;
  }
}
