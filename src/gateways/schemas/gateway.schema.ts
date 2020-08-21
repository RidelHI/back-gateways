import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gateway extends Document {
  @Prop()
  serialNumber: string;

  @Prop()
  name: string;

  @Prop()
  ipv4Address: string;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
