import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
