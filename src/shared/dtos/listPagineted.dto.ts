import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ListPaginatedDTO<T> {
  @ApiProperty({
    required: false,
    example: 5,
  })
  @IsOptional()
  @IsNotEmpty()
  page?: number;

  @ApiProperty({
    required: false,
    example: 5,
  })
  @IsOptional()
  @IsNotEmpty()
  pageSize?: number;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ required: false, nullable: true })
  items: T[];
}
