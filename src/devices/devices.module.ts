import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './schemas/device.schema';
import { GatewaysModule } from '../gateways/gateways.module';

@Module({
  imports: [
    GatewaysModule,
    MongooseModule.forFeature([
      {
        name: Device.name,
        schema: DeviceSchema,
      },
    ]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
