import * as crypto from 'crypto'
import { Injectable } from "@nestjs/common";
import { UrlRepository } from "@shared/repositories";
import { plainToClass } from "class-transformer";
import { CreateShortenedUrlResponseDTO } from "./dtos/createShortenedUrlResponse.dto";
import { CreateShortenedUrlRequestDTO } from "./dtos/createShortenedUrlRequest.dto";

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BigInt(ALPHABET.length);

@Injectable()
export class CreateShortenedUrlService {
    constructor(private readonly urlRepository: UrlRepository) { }

    async execute(dto: CreateShortenedUrlRequestDTO): Promise<CreateShortenedUrlResponseDTO> {
        const { originalUrl } = dto;
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        const encrypted = this.encryptURL(originalUrl, key, iv);
        const shortId = this.base52Encode(encrypted, 6);

        await this.urlRepository.create({
            originalUrl,
            shortId
        });

        const response: CreateShortenedUrlResponseDTO = plainToClass(
            CreateShortenedUrlResponseDTO,
            {
              shortenedUrl: `http://localhost/${shortId}`
            },
            { excludeExtraneousValues: true },
        );

        return response;
    }

    encryptURL(url: string, key: Buffer, iv: Buffer): Buffer {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        const encrypted = Buffer.concat([cipher.update(url, 'utf8'), cipher.final()]);
        return encrypted;
    }

    base52Encode(buffer: Buffer, length: number = 6): string {
        let num = BigInt('0x' + buffer.toString('hex'));
        let result = '';

        while (result.length < length) {
            result = ALPHABET[Number(num % BASE)] + result;
            num = num / BASE;
        }

        return result;
    }
}