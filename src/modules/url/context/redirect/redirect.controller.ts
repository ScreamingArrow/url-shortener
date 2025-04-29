import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Redirect,
} from '@nestjs/common';
import { RedirectUrlService } from './redirect.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RedirectUrlRequestDTO } from './dtos/redirectUrlRequest.dto';

@Controller('/:shortId')
export class RedirectUrlController {
  constructor(private readonly service: RedirectUrlService) {}

  @ApiBearerAuth('Bearer')
  @Get()
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @Redirect()
  public execute(@Param() param: RedirectUrlRequestDTO) {
    return this.service.execute(param);
  }
}
