import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DeleteUrlService } from './delete.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@shared/guards';
import { ParamDTO } from '@shared/dtos';

@Controller('urls/:id')
export class DeleteUrlController {
  constructor(private readonly service: DeleteUrlService) {}

  @ApiBearerAuth('Bearer')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  public execute(@Param() param: ParamDTO) {
    return this.service.execute(param);
  }
}
