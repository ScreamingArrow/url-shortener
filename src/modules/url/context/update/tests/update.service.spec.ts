import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { ParamDTO } from '@shared/dtos';
import { UrlRepository } from '@shared/repositories';
import { MetricRepository } from '@shared/repositories/metric.repository';
import { MetricRepositoryMock } from '@shared/repositories/mocks/metric.mock.repository';
import {
  UrlRepositoryMock,
  fakeUrl,
} from '@shared/repositories/mocks/url.mock.repository';
import { UpdateUrlService } from '../update.service';
import { UpdateRequestUrlDTO } from '../dtos/updateUrlRequest.dto';

describe('UpdateUrlService', () => {
  let service: UpdateUrlService;
  let repository: UrlRepository;
  let getByIdMock: jest.SpyInstance;
  let updateMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUrlService,
        {
          provide: UrlRepository,
          useClass: UrlRepositoryMock,
        },
        {
          provide: MetricRepository,
          useFactory: MetricRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UpdateUrlService>(UpdateUrlService);
    repository = module.get<UrlRepository>(UrlRepository);

    getByIdMock = jest.spyOn(repository, 'getById');
    updateMock = jest.spyOn(repository, 'update');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should update a URL when it exists', async () => {
    const param: ParamDTO = { id: 1 };
    const dto: UpdateRequestUrlDTO = { originalUrl: 'https://example.com' };

    getByIdMock.mockResolvedValue(fakeUrl);
    updateMock.mockResolvedValue(undefined);

    await service.execute(param, dto);

    expect(getByIdMock).toHaveBeenCalledTimes(1);
    expect(getByIdMock).toHaveBeenCalledWith(1);
    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(updateMock).toHaveBeenCalledWith(fakeUrl);
  });

  it('should throw NotFoundException if URL does not exist', async () => {
    const param: ParamDTO = { id: 1 };
    const dto: UpdateRequestUrlDTO = { originalUrl: 'https://example.com' };

    getByIdMock.mockResolvedValue(undefined);

    await expect(service.execute(param, dto)).rejects.toThrow(
      NotFoundException,
    );

    expect(getByIdMock).toHaveBeenCalledTimes(1);
  });
});
