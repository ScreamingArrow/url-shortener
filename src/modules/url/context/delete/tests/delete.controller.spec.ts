import { Test, TestingModule } from '@nestjs/testing';
import { ParamDTO } from '@shared/dtos';
import { DeleteUrlController } from '../delete.controller';
import { DeleteUrlService } from '../delete.service';
import { UrlRepositoryMock } from '@shared/repositories/mocks/url.mock.repository';
import { UrlRepository } from '@shared/repositories';

describe('DeleteUrlController', () => {
  let controller: DeleteUrlController;
  let service: DeleteUrlService;
  let serviceExecuteMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUrlController],
      providers: [
        DeleteUrlService,
        {
          provide: UrlRepository,
          useFactory: UrlRepositoryMock,
        },
      ],
    }).compile();

    controller = module.get<DeleteUrlController>(DeleteUrlController);
    service = module.get<DeleteUrlService>(DeleteUrlService);

    serviceExecuteMock = jest
      .spyOn(service, 'execute')
      .mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call DeleteUrlService.execute with correct param', async () => {
    const param: ParamDTO = { id: 1 };

    const result = await controller.execute(param);

    expect(serviceExecuteMock).toHaveBeenCalledTimes(1);
    expect(serviceExecuteMock).toHaveBeenCalledWith(param);
    expect(result).toBeUndefined();
  });
});
