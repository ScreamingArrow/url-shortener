import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RedirectUrlRequestDTO {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'ocjnJn',
  })
  @IsString()
  @IsNotEmpty()
  shortId: string;
}
