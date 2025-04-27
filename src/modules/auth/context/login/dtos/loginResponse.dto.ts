import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class LoginResponseDTO {
    @Expose()
    @ApiProperty({
        type: String,
        nullable: false,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV4YW1wbGUgVXNlciIsImlhdCI6MTY5NDA1MDQwMH0.V1Gf6xKMSFb50lcl8fMFocf5H1w2BuZTCS1vNQenbVg',
    })
    accessToken: string;

    @Expose()
    @ApiProperty({
        type: String,
        nullable: false,
        example: 'Bearer'
    })
    tokenType: string;
}