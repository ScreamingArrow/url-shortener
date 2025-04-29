import { TestingModule, Test } from '@nestjs/testing';
import { UserGuard } from '@shared/guards';
import { UrlRepository, UserRepository } from '@shared/repositories';
import { MetricRepository } from '@shared/repositories/metric.repository';
import { MetricRepositoryMock } from '@shared/repositories/mocks/metric.mock.repository';
import {
  fakeUrl,
  UrlRepositoryMock,
} from '@shared/repositories/mocks/url.mock.repository';
import { UserRepositoryMock } from '@shared/repositories/mocks/user.mock.repository';
import { RedirectUrlRequestDTO } from '../dtos/redirectUrlRequest.dto';
import { RedirectUrlController } from '../redirect.controller';
import { RedirectUrlService } from '../redirect.service';

describe('RedirectUrlController', () => {
  let controller: RedirectUrlController;
  let service: RedirectUrlService;
  let serviceExecuteMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectUrlController],
      providers: [
        RedirectUrlService,
        {
          provide: UrlRepository,
          useFactory: UrlRepositoryMock,
        },
        {
          provide: UserRepository,
          useFactory: UserRepositoryMock,
        },
        {
          provide: MetricRepository,
          useFactory: MetricRepositoryMock,
        },
        UserGuard,
      ],
    }).compile();

    controller = module.get<RedirectUrlController>(RedirectUrlController);
    service = module.get<RedirectUrlService>(RedirectUrlService);

    serviceExecuteMock = jest.spyOn(service, 'execute').mockResolvedValue({
      url: 'https://google.com.br',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call service.execute and redirect to the originalURL', async () => {
    const param: RedirectUrlRequestDTO = { shortId: fakeUrl.shortId };

    const result = await controller.execute(param);

    expect(serviceExecuteMock).toHaveBeenCalledTimes(1);
    expect(serviceExecuteMock).toHaveBeenCalledWith(param);
    expect(result).toEqual({
      url: 'https://google.com.br',
    });
  });
});
