import { Module } from "@nestjs/common";
import { CreateShortenedUrlController } from "./context/create/createShortenedUrl.controller";
import { CreateShortenedUrlService } from "./context/create/createShortenedUrl.service";
import { UrlRepository } from "@shared/repositories";

@Module({
    controllers: [CreateShortenedUrlController],
    providers: [CreateShortenedUrlService, UrlRepository],
    imports: []
})

export class ShortenerModule {}