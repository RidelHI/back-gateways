import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Gateway } from '../../gateways/schemas/gateway.schema';

@Schema({ timestamps: true })
export class Device extends Document {
  @Prop()
  uid: number;

  @Prop()
  vendor: string;

  @Prop({ type: Date })
  createdDate: Date;

  @Prop({
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
  })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Gateway' })
  gateway: { type: MongooseSchema.Types.ObjectId; ref: 'Gateway' };
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
