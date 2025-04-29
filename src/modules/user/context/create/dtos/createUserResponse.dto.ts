import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateUserResponseDTO {
  @Expose()
  @ApiProperty({
    type: Number,
    nullable: false,
    example: '1',
  })
  id: number;

  @Expose()
  @ApiProperty({
    type: String,
    nullable: false,
    example: 'example@email.com',
  })
  email: string;
}
