import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "@shared/repositories";
import { CreateUserRequestDTO } from "./dtos/createUserRequest.dto";
import { plainToClass } from "class-transformer";
import { CreateUserResponseDTO } from "./dtos/createUserResponse.dto";

@Injectable()
export class CreateUserService {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(dto: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
        const { email, password } = dto;

        const existingUser = await this.userRepository.getByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);

        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
        });


        const response: CreateUserResponseDTO = plainToClass(
            CreateUserResponseDTO,
            user,
            { excludeExtraneousValues: true },
        );

        return response;
    }
}