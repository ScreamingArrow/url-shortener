import { Module } from '@nestjs/common';
import { CreateUrlController } from './context/create/create.controller';
import { CreateUrlService } from './context/create/create.service';
import { UrlRepository, UserRepository } from '@shared/repositories';
import { ListUrlsController } from './context/list/list.controller';
import { ListUrlsService } from './context/list/list.service';
import { DeleteUrlController } from './context/delete/delete.controller';
import { DeleteUrlService } from './context/delete/delete.service';
import { UpdateUrlService } from './context/update/update.service';
import { UpdateUrlController } from './context/update/update.controller';
import { RedirectUrlController } from './context/redirect/redirect.controller';
import { RedirectUrlService } from './context/redirect/redirect.service';
import { MetricRepository } from '@shared/repositories/metric.repository';

@Module({
  controllers: [
    CreateUrlController,
    ListUrlsController,
    DeleteUrlController,
    UpdateUrlController,
    RedirectUrlController,
  ],
  providers: [
    CreateUrlService,
    ListUrlsService,
    DeleteUrlService,
    UpdateUrlService,
    RedirectUrlService,
    UrlRepository,
    UserRepository,
    MetricRepository,
  ],
  imports: [],
})
export class UrlModule {}
