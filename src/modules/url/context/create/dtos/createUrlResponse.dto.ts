import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateUrlResponseDTO {
  @Expose()
  @ApiProperty({
    type: String,
    nullable: false,
    example: 'http://localhost/aZbKq7',
  })
  shortenedUrl: string;
}
