import { Injectable, NotFoundException } from '@nestjs/common';
import { ParamDTO } from '@shared/dtos';
import { UrlRepository } from '@shared/repositories';

@Injectable()
export class DeleteUrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(param: ParamDTO) {
    const url = await this.urlRepository.getById(param.id);

    if (!url) {
      throw new NotFoundException('url not found');
    }
    await this.urlRepository.delete(param.id);
  }
}
