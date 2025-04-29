import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUrlRequestDTO {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'https://google.com',
  })
  @IsString()
  @IsNotEmpty()
  originalUrl: string;
}
