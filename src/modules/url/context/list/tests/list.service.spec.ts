import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { UrlRepository } from '@shared/repositories';
import {
  UrlRepositoryMock,
  fakeUrl,
} from '@shared/repositories/mocks/url.mock.repository';
import { ListUrlsService } from '../list.service';
import { OptionsDTO } from '@shared/dtos';
import { fakeUser } from '@shared/repositories/mocks/user.mock.repository';

describe('ListUrlsService', () => {
  let service: ListUrlsService;
  let repository: UrlRepository;

  let listMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUrlsService,
        {
          provide: UrlRepository,
          useClass: UrlRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ListUrlsService>(ListUrlsService);
    repository = module.get<UrlRepository>(UrlRepository);

    listMock = jest.spyOn(repository, 'list');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should list a URLs when exists', async () => {
    const options: OptionsDTO = { page: 1, pageSize: 10 };

    listMock.mockResolvedValue([fakeUrl, 1]);

    await service.execute(fakeUser, options);

    expect(listMock).toHaveBeenCalledTimes(1);
    expect(listMock).toHaveBeenCalledWith(fakeUser.id, options);
  });

  it('should throw NotFoundException if URL does not exist', async () => {
    const options: OptionsDTO = { page: 1, pageSize: 10 };

    listMock.mockResolvedValue([[], 0]);

    await expect(service.execute(fakeUser, options)).rejects.toThrow(
      NotFoundException,
    );

    expect(listMock).toHaveBeenCalledTimes(1);
  });
});
