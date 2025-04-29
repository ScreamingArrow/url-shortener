import env from '@config/env';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { UrlRepository } from '@shared/repositories';
import { plainToClass } from 'class-transformer';
import { User } from '@shared/entities';
import { CreateUrlRequestDTO } from './dtos/createUrlRequest.dto';
import { CreateUrlResponseDTO } from './dtos/createUrlResponse.dto';
import { MetricRepository } from '@shared/repositories/metric.repository';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BigInt(ALPHABET.length);
const RANDOM_BYTES_SIZE = env().application.randomBytesSize;
const PORT = env().application.port;

@Injectable()
export class CreateUrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly metricRepository: MetricRepository,
  ) {}

  async execute(
    dto: CreateUrlRequestDTO,
    user: User,
  ): Promise<CreateUrlResponseDTO> {
    const { originalUrl } = dto;
    const key = crypto.randomBytes(RANDOM_BYTES_SIZE);
    const iv = crypto.randomBytes(16);

    const encrypted = this.encryptURL(originalUrl, key, iv);
    const shortId = this.base52Encode(encrypted, 6);

    const url = await this.urlRepository.create({
      originalUrl,
      shortId,
      user,
    });

    await this.metricRepository.create({ url });

    const response: CreateUrlResponseDTO = plainToClass(
      CreateUrlResponseDTO,
      {
        shortenedUrl: `http://localhost:${PORT}/${shortId}`,
      },
      { excludeExtraneousValues: true },
    );

    return response;
  }

  encryptURL(url: string, key: Buffer, iv: Buffer): Buffer {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([
      cipher.update(url, 'utf8'),
      cipher.final(),
    ]);
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
