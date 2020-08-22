import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gateway } from './schemas/gateway.schema';
import { Model } from 'mongoose';
import { CreateGatewayDto } from './dto/create-gateway.dto';

@Injectable()
export class GatewaysService {
  constructor(
    @InjectModel(Gateway.name) private readonly gatewayModel: Model<Gateway>,
  ) {}

  async findAll(): Promise<Gateway[]> {
    return this.gatewayModel.find().exec();
  }

  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    const createdGateway = new this.gatewayModel(createGatewayDto);
    return await createdGateway.save();
  }
}
