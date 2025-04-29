import { TestingModule, Test } from '@nestjs/testing';
import { OptionsDTO } from '@shared/dtos';
import { UrlRepository, UserRepository } from '@shared/repositories';
import { UrlRepositoryMock } from '@shared/repositories/mocks/url.mock.repository';
import { ListUrlsController } from '../list.controller';
import { ListUrlsService } from '../list.service';
import {
  fakeUser,
  UserRepositoryMock,
} from '@shared/repositories/mocks/user.mock.repository';
import { UserGuard } from '@shared/guards';

describe('ListUrlsService', () => {
  let controller: ListUrlsController;
  let service: ListUrlsService;
  let serviceExecuteMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListUrlsController],
      providers: [
        ListUrlsService,
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

    controller = module.get<ListUrlsController>(ListUrlsController);
    service = module.get<ListUrlsService>(ListUrlsService);

    serviceExecuteMock = jest
      .spyOn(service, 'execute')
      .mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call ListUrlsService.execute with correct param', async () => {
    const options: OptionsDTO = { page: 1, pageSize: 10 };

    await controller.execute(fakeUser, options);

    expect(serviceExecuteMock).toHaveBeenCalledTimes(1);
    expect(serviceExecuteMock).toHaveBeenCalledWith(fakeUser, options);
  });
});
