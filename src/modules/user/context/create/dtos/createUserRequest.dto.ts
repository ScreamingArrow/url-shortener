import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class CreateUserRequestDTO {
    @ApiProperty({
        type: String,
        required: true,
        nullable: false,
        example: 'example@emai.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        nullable: false,
        example: 'Lucas@123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}