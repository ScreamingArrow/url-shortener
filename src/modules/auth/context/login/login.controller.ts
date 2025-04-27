import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginRequestDTO } from "./dtos/loginRequest.dto";
import { ApiTags } from "@nestjs/swagger";
import { LoginResponseDTO } from "./dtos/loginResponse.dto";

@Controller('login')
export class LoginController {
    constructor(private readonly service: LoginService) {}
    
    @ApiTags('auth')
    @HttpCode(HttpStatus.OK)
    @Post()
    public execute(
        @Body() body: LoginRequestDTO,
    ): Promise<LoginResponseDTO> {
        return this.service.execute(body);
    }

}