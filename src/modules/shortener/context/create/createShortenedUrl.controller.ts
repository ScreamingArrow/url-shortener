import { Controller, HttpCode, HttpStatus, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateShortenedUrlService } from "./createShortenedUrl.service";
import { CreateShortenedUrlRequestDTO } from "./dtos/createShortenedUrlRequest.dto";
import { CreateShortenedUrlResponseDTO } from "./dtos/createShortenedUrlResponse.dto";

@Controller('shorten')
export class CreateShortenedUrlController {
  constructor(private service: CreateShortenedUrlService) {}

  @ApiTags('shorten')
  @HttpCode(HttpStatus.OK)
  @Get()
  public execute(
    @Query() query: CreateShortenedUrlRequestDTO
  ): Promise<CreateShortenedUrlResponseDTO> {
    return this.service.execute(query);
  }
}