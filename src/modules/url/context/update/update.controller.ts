import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateUrlService } from './update.service';
import { ParamDTO } from '@shared/dtos';
import { UpdateRequestUrlDTO } from './dtos/updateUrlRequest.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@shared/guards';
import { UpdateUrlResponseDTO } from './dtos/updateUrlResponse.dto';

@Controller('urls/:id')
export class UpdateUrlController {
  constructor(private readonly service: UpdateUrlService) {}

  @ApiBearerAuth('Bearer')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch()
  public execute(
    @Param() param: ParamDTO,
    @Body() body: UpdateRequestUrlDTO,
  ): Promise<UpdateUrlResponseDTO> {
    return this.service.execute(param, body);
  }
}
