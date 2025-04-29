import { Injectable, NotFoundException } from '@nestjs/common';
import { ParamDTO } from '@shared/dtos';
import { UrlRepository } from '@shared/repositories';
import { UpdateRequestUrlDTO } from './dtos/updateUrlRequest.dto';
import { UpdateUrlResponseDTO } from './dtos/updateUrlResponse.dto';

@Injectable()
export class UpdateUrlService {
  constructor(private readonly urlService: UrlRepository) {}

  async execute(
    param: ParamDTO,
    dto: UpdateRequestUrlDTO,
  ): Promise<UpdateUrlResponseDTO> {
    const url = await this.urlService.getById(param.id);

    if (!url) {
      throw new NotFoundException('Url not found');
    }

    url.originalUrl = dto.originalUrl;

    return this.urlService.update(url);
  }
}
