import { IsIP, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGatewayDto {
  @ApiProperty({ description: 'A unique serial number' })
  @IsString()
  readonly serialNumber: string;

  @ApiProperty({ description: 'Human-readable name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'IPv4 address' })
  @IsIP()
  readonly ipv4Address: string;
}
