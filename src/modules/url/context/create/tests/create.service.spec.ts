import { TestingModule, Test } from '@nestjs/testing';
import { UrlRepository } from '@shared/repositories';
import { UrlRepositoryMock } from '@shared/repositories/mocks/url.mock.repository';
import * as crypto from 'crypto';
import { CreateUrlService } from '../create.service';
import { CreateUrlRequestDTO } from '../dtos/createUrlRequest.dto';
import { fakeUser } from '@shared/repositories/mocks/user.mock.repository';
import { User } from '@shared/entities';
import { MetricRepository } from '@shared/repositories/metric.repository';
import { MetricRepositoryMock } from '@shared/repositories/mocks/metric.mock.repository';

describe('CreateUrlService', () => {
  let service: CreateUrlService;
  let urlRepository: UrlRepository;
  let metricRepository: MetricRepository;
  let urlRepositoryCreateMock: jest.SpyInstance;
  let metricRepositoryCreateMock: jest.SpyInstance;
  let cryptoRandomBytesMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUrlService,
        {
          provide: UrlRepository,
          useFactory: UrlRepositoryMock,
        },
        {
          provide: MetricRepository,
          useFactory: MetricRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CreateUrlService>(CreateUrlService);
    urlRepository = module.get(UrlRepository);
    metricRepository = module.get(MetricRepository);

    urlRepositoryCreateMock = jest
      .spyOn(urlRepository, 'create')
      .mockResolvedValue(undefined);

    metricRepositoryCreateMock = jest
      .spyOn(metricRepository, 'create')
      .mockResolvedValue(undefined);

    cryptoRandomBytesMock = jest
      .spyOn(crypto, 'randomBytes')
      .mockImplementation((size: number) => {
        return Buffer.alloc(size, 1);
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should create a shortened URL and save it in the repository', async () => {
    const dto: CreateUrlRequestDTO = { originalUrl: 'https://example.com' };

    const result = await service.execute(dto, fakeUser);

    expect(urlRepositoryCreateMock).toHaveBeenCalledTimes(1);
    expect(metricRepositoryCreateMock).toHaveBeenCalledTimes(1);
    expect(urlRepositoryCreateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        originalUrl: dto.originalUrl,
        shortId: expect.any(String),
        user: expect.any(User),
      }),
    );

    expect(result).toEqual({
      shortenedUrl: expect.any(String),
    });
  });

  it('should generate a valid shortId with exactly 6 letters', async () => {
    const dto: CreateUrlRequestDTO = {
      originalUrl: 'https://anotherexample.com',
    };

    const response = await service.execute(dto, fakeUser);
    const shortId = response.shortenedUrl.split('/').pop();

    expect(shortId).toHaveLength(6);
    expect(shortId).toMatch(/^[a-zA-Z]+$/);
  });

  describe('internals', () => {
    it('base52Encode should return a string of correct length and only letters', () => {
      const buffer = Buffer.from('123456789abcdef', 'hex');
      const shortId = service.base52Encode(buffer, 6);

      expect(shortId).toHaveLength(6);
      expect(shortId).toMatch(/^[a-zA-Z]+$/);
    });

    it('encryptURL should return a buffer', () => {
      const key = crypto.randomBytes(32);
      const iv = crypto.randomBytes(16);
      const url = 'https://my-url.com';

      const encrypted = service.encryptURL(url, key, iv);

      expect(encrypted).toBeInstanceOf(Buffer);
      expect(encrypted.length).toBeGreaterThan(0);
    });
  });

  describe('crypto and repository mock verification', () => {
    it('should call crypto.randomBytes', async () => {
      const dto: CreateUrlRequestDTO = {
        originalUrl: 'https://testcrypto.com',
      };

      await service.execute(dto, fakeUser);

      expect(cryptoRandomBytesMock).toHaveBeenCalledTimes(2);
      expect(cryptoRandomBytesMock).toHaveBeenCalledWith(32);
      expect(cryptoRandomBytesMock).toHaveBeenCalledWith(16);
    });
  });
});
