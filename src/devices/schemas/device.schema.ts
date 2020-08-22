import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Device extends Document {
  @Prop()
  uid: number;

  @Prop()
  vendor: string;

  @Prop()
  createdDate: Date;

  @Prop()
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Person' })
  gateway: { type: MongooseSchema.Types.ObjectId; ref: 'Person' };
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
