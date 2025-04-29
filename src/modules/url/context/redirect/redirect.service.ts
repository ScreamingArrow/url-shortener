import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '@shared/repositories';
import { MetricRepository } from '@shared/repositories/metric.repository';
import { RedirectUrlRequestDTO } from './dtos/redirectUrlRequest.dto';

@Injectable()
export class RedirectUrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly metricRepository: MetricRepository,
  ) {}

  async execute(param: RedirectUrlRequestDTO) {
    const url = await this.urlRepository.getByShortId(param.shortId);

    if (!url) {
      throw new NotFoundException('Url not found');
    }

    url.metric.numberOfClicks += 1;
    await this.metricRepository.update(url.metric);

    return { url: url.originalUrl };
  }
}
