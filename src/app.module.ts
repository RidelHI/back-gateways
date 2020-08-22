import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaysModule } from './gateways/gateways.module';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from './devices/devices.module';
import configuration from '../config/configuration';

const config = configuration();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${config.database.host}:${config.database.port}/${config.database.name}`,
    ),
    GatewaysModule,
    DevicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
