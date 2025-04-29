import { TestingModule, Test } from '@nestjs/testing';
import { UrlRepository, UserRepository } from '@shared/repositories';
import { CreateUrlController } from '../create.controller';
import { CreateUrlService } from '../create.service';
import { CreateUrlRequestDTO } from '../dtos/createUrlRequest.dto';
import { CreateUrlResponseDTO } from '../dtos/createUrlResponse.dto';
import { UserGuard } from '@shared/guards';
import { UrlRepositoryMock } from '@shared/repositories/mocks/url.mock.repository';
import {
  fakeUser,
  UserRepositoryMock,
} from '@shared/repositories/mocks/user.mock.repository';
import { MetricRepository } from '@shared/repositories/metric.repository';
import { MetricRepositoryMock } from '@shared/repositories/mocks/metric.mock.repository';

describe('CreateUrlController', () => {
  let controller: CreateUrlController;
  let service: CreateUrlService;
  let serviceExecuteMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUrlController],
      providers: [
        CreateUrlService,
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

    controller = module.get<CreateUrlController>(CreateUrlController);
    service = module.get<CreateUrlService>(CreateUrlService);

    serviceExecuteMock = jest.spyOn(service, 'execute').mockResolvedValue({
      shortenedUrl: 'http://localhost/abcdef',
    } as CreateUrlResponseDTO);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call service.execute and return a shortened URL', async () => {
    const query: CreateUrlRequestDTO = { originalUrl: 'https://example.com' };

    const result = await controller.execute(query, fakeUser);

    expect(serviceExecuteMock).toHaveBeenCalledTimes(1);
    expect(serviceExecuteMock).toHaveBeenCalledWith(query, fakeUser);
    expect(result).toEqual({
      shortenedUrl: 'http://localhost/abcdef',
    });
  });
});
