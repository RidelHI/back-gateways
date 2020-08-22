import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Gateway extends Document {
  @Prop({ unique: true })
  serialNumber: string;

  @Prop()
  name: string;

  @Prop()
  ipv4Address: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Device' }])
  devices: [{ type: MongooseSchema.Types.ObjectId; ref: 'Device' }];
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
