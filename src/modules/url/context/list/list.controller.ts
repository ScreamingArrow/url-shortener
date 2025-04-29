import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ListUrlsService } from './list.service';
import { OptionsDTO } from '@shared/dtos';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard, UserGuard } from '@shared/guards';
import { CurrentUser } from '@shared/decorators';
import { User } from '@shared/entities';

@Controller('urls')
export class ListUrlsController {
  constructor(private readonly service: ListUrlsService) {}

  @ApiBearerAuth('Bearer')
  @UseGuards(AuthGuard, UserGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public execute(@CurrentUser() user: User, @Query() options?: OptionsDTO) {
    return this.service.execute(user, options);
  }
}
