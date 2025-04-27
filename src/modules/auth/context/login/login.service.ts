import * as bcrypt from 'bcrypt';
import { UserRepository } from "@shared/repositories";
import { LoginRequestDTO } from "./dtos/loginRequest.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDTO } from './dtos/loginResponse.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { email, password } = dto;

    const user = await this.usersRepository.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    };

    const payload = { sub: user.id, email: user.email };

    const accessToken  = this.jwtService.sign(payload);

    const response: LoginResponseDTO = plainToClass(
        LoginResponseDTO,
        {
            accessToken,
            tokenType: 'Bearer'
        },
        { excludeExtraneousValues: true },
        );
    
    return response;
  }
}