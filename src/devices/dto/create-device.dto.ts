import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ description: 'UID number' })
  @IsNumber()
  readonly uid: number;

  @ApiProperty({ description: 'Vendor' })
  @IsString()
  readonly vendor: string;

  @ApiProperty({ description: 'Created Date' })
  readonly createdDate: Date;

  @ApiProperty({ description: 'Status (online/offline)' })
  @IsString()
  readonly status: string;
}
