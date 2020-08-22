import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Gateway extends Document {
  @Prop()
  serialNumber: string;

  @Prop()
  name: string;

  @Prop()
  ipv4Address: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Device' }])
  devices: MongooseSchema.Types.ObjectId;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
