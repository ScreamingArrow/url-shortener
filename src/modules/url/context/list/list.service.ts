import { Injectable, NotFoundException } from '@nestjs/common';
import { ListPaginatedDTO, OptionsDTO } from '@shared/dtos';
import { UrlRepository } from '@shared/repositories';
import { plainToInstance } from 'class-transformer';
import { ListUrlResponseDTO } from './dtos/listResponse.dto';
import { User } from '@shared/entities';

@Injectable()
export class ListUrlsService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(user: User, options: OptionsDTO) {
    const [urls, count] = await this.urlRepository.list(user.id, options);

    if (urls.length === 0) {
      throw new NotFoundException('No urls found');
    }

    const items: ListUrlResponseDTO[] = plainToInstance(
      ListUrlResponseDTO,
      urls,
      { excludeExtraneousValues: true },
    );

    const response: ListPaginatedDTO<ListUrlResponseDTO> = {
      page: options?.page,
      pageSize: options?.pageSize,
      count,
      items,
    };

    return response;
  }
}
