import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Schema({ timestamps: true })
export class Gateway extends Document {
  @ApiModelProperty()
  @Prop({ unique: true })
  serialNumber: string;

  @ApiModelProperty()
  @Prop()
  name: string;

  @ApiModelProperty()
  @Prop()
  ipv4Address: string;

  @ApiModelProperty()
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Device' }])
  devices: [{ type: MongooseSchema.Types.ObjectId; ref: 'Device' }];
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
