import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ParamDTO {
  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
