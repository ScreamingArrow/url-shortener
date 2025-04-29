import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@shared/repositories';
import { ConflictException } from '@nestjs/common';
import { CreateUserRequestDTO } from '../dtos/createUserRequest.dto';
import { CreateUserResponseDTO } from '../dtos/createUserResponse.dto';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { UserRepositoryMock } from '@shared/repositories/mocks/user.mock.repository';
import { CreateUserService } from '../create.service';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let userRepository: UserRepository;
  let getByEmailMock: jest.SpyInstance;
  let createMock: jest.SpyInstance;
  let bcryptHashMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useFactory: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<UserRepository>(UserRepository);

    getByEmailMock = jest.spyOn(userRepository, 'getByEmail');
    createMock = jest.spyOn(userRepository, 'create');
    bcryptHashMock = jest.spyOn(bcrypt, 'hash');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should create a user successfully', async () => {
    const dto: CreateUserRequestDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    getByEmailMock.mockResolvedValue(null);
    bcryptHashMock.mockResolvedValue('hashed_password');
    createMock.mockResolvedValue({
      id: 1,
      email: dto.email,
      password: 'hashed_password',
    });

    const result = await service.execute(dto);

    expect(getByEmailMock).toHaveBeenCalledTimes(1);
    expect(getByEmailMock).toHaveBeenCalledWith(dto.email);

    expect(bcryptHashMock).toHaveBeenCalledTimes(1);
    expect(bcryptHashMock).toHaveBeenCalledWith(dto.password, 10);

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({
      email: dto.email,
      password: 'hashed_password',
    });

    expect(result).toEqual(
      plainToClass(
        CreateUserResponseDTO,
        {
          id: 1,
          email: dto.email,
        },
        { excludeExtraneousValues: true },
      ),
    );
  });

  it('should throw ConflictException if email already exists', async () => {
    const dto: CreateUserRequestDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    getByEmailMock.mockResolvedValue({ id: 1, email: dto.email });

    await expect(service.execute(dto)).rejects.toThrow(ConflictException);

    expect(getByEmailMock).toHaveBeenCalledTimes(1);
    expect(getByEmailMock).toHaveBeenCalledWith(dto.email);

    expect(bcryptHashMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });
});
