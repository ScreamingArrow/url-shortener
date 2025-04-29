import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUrlService } from './create.service';
import { CreateUrlRequestDTO } from './dtos/createUrlRequest.dto';
import { CreateUrlResponseDTO } from './dtos/createUrlResponse.dto';
import { User } from '@shared/entities';
import { UserGuard } from '@shared/guards';
import { CurrentUser } from '@shared/decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('urls/shorten')
export class CreateUrlController {
  constructor(private service: CreateUrlService) {}

  @ApiBearerAuth('Bearer')
  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public execute(
    @Query() query: CreateUrlRequestDTO,
    @CurrentUser() user: User,
  ): Promise<CreateUrlResponseDTO> {
    return this.service.execute(query, user);
  }
}
