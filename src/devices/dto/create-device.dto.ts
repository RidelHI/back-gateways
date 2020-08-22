import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsString } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ description: 'UID number' })
  @IsNumberString()
  readonly uid: number;

  @ApiProperty({ description: 'Vendor' })
  @IsString()
  readonly vendor: string;

  @ApiProperty({ description: 'Created Date' })
  readonly createdDate: Date;

  @ApiProperty({ description: 'Status (online/offline)' })
  @IsEnum(['online', 'offline'])
  readonly status: string;
}
