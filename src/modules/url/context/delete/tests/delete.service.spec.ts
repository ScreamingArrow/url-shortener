import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { ParamDTO } from '@shared/dtos';
import { UrlRepository } from '@shared/repositories';
import { DeleteUrlService } from '../delete.service';
import {
  fakeUrl,
  UrlRepositoryMock,
} from '@shared/repositories/mocks/url.mock.repository';

describe('DeleteUrlService', () => {
  let service: DeleteUrlService;
  let repository: UrlRepository;

  let getByIdMock: jest.SpyInstance;
  let deleteMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUrlService,
        {
          provide: UrlRepository,
          useClass: UrlRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<DeleteUrlService>(DeleteUrlService);
    repository = module.get<UrlRepository>(UrlRepository);

    getByIdMock = jest.spyOn(repository, 'getById');
    deleteMock = jest.spyOn(repository, 'delete');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should delete a URL when it exists', async () => {
    const param: ParamDTO = { id: 1 };

    getByIdMock.mockResolvedValue(fakeUrl);
    deleteMock.mockResolvedValue(undefined);

    await service.execute(param);

    expect(getByIdMock).toHaveBeenCalledTimes(1);
    expect(getByIdMock).toHaveBeenCalledWith(1);
    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if URL does not exist', async () => {
    const param: ParamDTO = { id: 2 };

    getByIdMock.mockResolvedValue(null);

    await expect(service.execute(param)).rejects.toThrow(NotFoundException);

    expect(getByIdMock).toHaveBeenCalledTimes(1);
    expect(getByIdMock).toHaveBeenCalledWith(2);
    expect(deleteMock).not.toHaveBeenCalled();
  });
});
