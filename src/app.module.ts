import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaysModule } from './gateways/gateways.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

const config = configuration();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${config.database.host}/${config.database.port}`,
    ),
    GatewaysModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
