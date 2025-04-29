import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class MetricDTO {
  @Expose()
  @ApiProperty({
    type: Number,
    nullable: false,
    example: 1,
  })
  numberOfClicks: number;
}
export class ListUrlResponseDTO {
  @Expose()
  @ApiProperty({
    type: Number,
    nullable: false,
    example: 1,
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    nullable: false,
    example: 'https://google.com',
  })
  originalUrl: string;

  @Expose()
  @ApiProperty({
    type: String,
    nullable: false,
    example: 'http://localhost/aZbKq7',
  })
  shortId: string;

  @Expose()
  @ApiProperty({
    type: MetricDTO,
    nullable: false,
  })
  @Type(() => MetricDTO)
  metric: MetricDTO;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
