import { Module } from '@nestjs/common';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Gateway, GatewaySchema } from './schemas/gateway.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Gateway.name,
        schema: GatewaySchema,
      },
    ]),
  ],
  controllers: [GatewaysController],
  providers: [GatewaysService],
})
export class GatewaysModule {}
