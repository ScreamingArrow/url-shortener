import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from '../login.controller'; // adjust the path
import { LoginService } from '../login.service';
import { LoginRequestDTO } from '../dtos/loginRequest.dto';
import { LoginResponseDTO } from '../dtos/loginResponse.dto';
import { plainToClass } from 'class-transformer';

class LoginServiceMock {
  execute = jest.fn();
}

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;
  let serviceExecuteMock: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useClass: LoginServiceMock,
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);

    serviceExecuteMock = jest.spyOn(service, 'execute').mockResolvedValue(
      plainToClass(
        LoginResponseDTO,
        {
          accessToken: 'mocked-access-token',
          tokenType: 'Bearer',
        },
        { excludeExtraneousValues: true },
      ),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should call service.execute with correct body and return a token', async () => {
    const body: LoginRequestDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await controller.execute(body);

    expect(serviceExecuteMock).toHaveBeenCalledTimes(1);
    expect(serviceExecuteMock).toHaveBeenCalledWith(body);

    expect(result).toEqual(
      plainToClass(
        LoginResponseDTO,
        {
          accessToken: 'mocked-access-token',
          tokenType: 'Bearer',
        },
        { excludeExtraneousValues: true },
      ),
    );
  });
});
