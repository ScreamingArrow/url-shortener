import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateShortenedUrlRequestDTO {
    @ApiProperty({
        type: String,
        required: true,
        nullable: false,
        example: 'https://teddy360.com.br',
      })
      @IsString()
      @IsNotEmpty()
      originalUrl: string;
}