import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OptionsDTO {
  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @ApiProperty({ required: false, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  pageSize: number;
}
