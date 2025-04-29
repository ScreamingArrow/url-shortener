import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '../create.controller';
import { CreateUserService } from '../create.service';
import { CreateUserRequestDTO } from '../dtos/createUserRequest.dto';
import { CreateUserResponseDTO } from '../dtos/createUserResponse.dto';
import { plainToClass } from 'class-transformer';
import { UserRepository } from '@shared/repositories';
import { UserRepositoryMock } from '@shared/repositories/mocks/user.mock.repository';

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let service: CreateUserService;
  let serviceExecuteMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useFactory: UserRepositoryMock,
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    service = module.get<CreateUserService>(CreateUserService);

    serviceExecuteMock = jest.spyOn(service, 'execute').mockResolvedValue(
      plainToClass(
        CreateUserResponseDTO,
        {
          id: 1,
          email: 'test@example.com',
        },
        { excludeExtraneousValues: true },
      ),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call service.execute and return created user', async () => {
    const body: CreateUserRequestDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await controller.execute(body);

    expect(serviceExecuteMock).toHaveBeenCalledTimes(1);
    expect(serviceExecuteMock).toHaveBeenCalledWith(body);
    expect(result).toEqual(
      plainToClass(
        CreateUserResponseDTO,
        {
          id: 1,
          email: 'test@example.com',
        },
        { excludeExtraneousValues: true },
      ),
    );
  });
});
