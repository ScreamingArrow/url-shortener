import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from '../login.service'; // Adjust the path if needed
import { UserRepository } from '@shared/repositories';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginRequestDTO } from '../dtos/loginRequest.dto';
import { LoginResponseDTO } from '../dtos/loginResponse.dto';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { UserRepositoryMock } from '@shared/repositories/mocks/user.mock.repository';

class JwtServiceMock {
  sign = jest.fn();
}

describe('LoginService', () => {
  let service: LoginService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  let bcryptCompareMock: jest.SpyInstance;
  let getByEmailMock: jest.SpyInstance;
  let jwtSignMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: UserRepository,
          useFactory: UserRepositoryMock,
        },
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);

    getByEmailMock = jest.spyOn(userRepository, 'getByEmail');
    jwtSignMock = jest.spyOn(jwtService, 'sign');
    bcryptCompareMock = jest.spyOn(bcrypt, 'compare');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should login successfully and return a JWT', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'hashed_password',
    };

    getByEmailMock.mockResolvedValue(user);
    bcryptCompareMock.mockResolvedValue(true);
    jwtSignMock.mockReturnValue('mocked-jwt-token');

    const dto: LoginRequestDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await service.execute(dto);

    expect(getByEmailMock).toHaveBeenCalledTimes(1);
    expect(getByEmailMock).toHaveBeenCalledWith('test@example.com');

    expect(bcryptCompareMock).toHaveBeenCalledTimes(1);
    expect(bcryptCompareMock).toHaveBeenCalledWith(
      'password123',
      'hashed_password',
    );

    expect(jwtSignMock).toHaveBeenCalledTimes(1);
    expect(jwtSignMock).toHaveBeenCalledWith({
      sub: 1,
      email: 'test@example.com',
    });

    expect(result).toEqual(
      plainToClass(
        LoginResponseDTO,
        {
          accessToken: 'mocked-jwt-token',
          tokenType: 'Bearer',
        },
        { excludeExtraneousValues: true },
      ),
    );
  });

  it('should throw UnauthorizedException if user does not exist', async () => {
    getByEmailMock.mockResolvedValue(null);

    const dto: LoginRequestDTO = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };

    await expect(service.execute(dto)).rejects.toThrow(UnauthorizedException);
    expect(getByEmailMock).toHaveBeenCalledWith('nonexistent@example.com');
    expect(bcryptCompareMock).not.toHaveBeenCalled();
    expect(jwtSignMock).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if password is invalid', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'hashed_password',
    };

    getByEmailMock.mockResolvedValue(user);
    bcryptCompareMock.mockResolvedValue(false);

    const dto: LoginRequestDTO = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    await expect(service.execute(dto)).rejects.toThrow(UnauthorizedException);

    expect(getByEmailMock).toHaveBeenCalledWith('test@example.com');
    expect(bcryptCompareMock).toHaveBeenCalledWith(
      'wrongpassword',
      'hashed_password',
    );
    expect(jwtSignMock).not.toHaveBeenCalled();
  });
});
