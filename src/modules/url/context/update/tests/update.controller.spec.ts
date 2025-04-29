import { TestingModule, Test } from '@nestjs/testing';
import { ParamDTO } from '@shared/dtos';
import { UserGuard } from '@shared/guards';
import { UrlRepository, UserRepository } from '@shared/repositories';
import {
  fakeUrl,
  UrlRepositoryMock,
} from '@shared/repositories/mocks/url.mock.repository';
import { UserRepositoryMock } from '@shared/repositories/mocks/user.mock.repository';
import { UpdateUrlController } from '../update.controller';
import { UpdateUrlService } from '../update.service';
import { UpdateRequestUrlDTO } from '../dtos/updateUrlRequest.dto';

describe('UpdateUrlController', () => {
  let controller: UpdateUrlController;
  let service: UpdateUrlService;
  let serviceExecuteMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUrlController],
      providers: [
        UpdateUrlService,
        {
          provide: UrlRepository,
          useFactory: UrlRepositoryMock,
        },
        {
          provide: UserRepository,
          useFactory: UserRepositoryMock,
        },
        UserGuard,
      ],
    }).compile();

    controller = module.get<UpdateUrlController>(UpdateUrlController);
    service = module.get<UpdateUrlService>(UpdateUrlService);

    serviceExecuteMock = jest
      .spyOn(service, 'execute')
      .mockResolvedValue(fakeUrl);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call service.execute with correct param', async () => {
    const param: ParamDTO = { id: fakeUrl.id };
    const dto: UpdateRequestUrlDTO = { originalUrl: fakeUrl.originalUrl };

    await controller.execute(param, dto);

    expect(serviceExecuteMock).toHaveBeenCalledTimes(1);
    expect(serviceExecuteMock).toHaveBeenCalledWith(param, dto);
  });
});
