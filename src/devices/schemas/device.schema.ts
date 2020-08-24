import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Schema({ timestamps: true })
export class Device extends Document {
  @ApiModelProperty()
  @Prop()
  uid: number;

  @ApiModelProperty()
  @Prop()
  vendor: string;

  @ApiModelProperty()
  @Prop({ type: Date })
  createdDate: Date;

  @ApiModelProperty()
  @Prop({
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
  })
  status: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
