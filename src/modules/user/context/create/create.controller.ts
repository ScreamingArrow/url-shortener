import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserRequestDTO } from './dtos/createUserRequest.dto';
import { CreateUserService } from './create.service';
import { CreateUserResponseDTO } from './dtos/createUserResponse.dto';

@Controller('users')
export class CreateUserController {
  constructor(private service: CreateUserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public execute(
    @Body() body: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    return this.service.execute(body);
  }
}
