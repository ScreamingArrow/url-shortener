import { Module } from "@nestjs/common";
import { CheckController } from "./context/check/check.controller";
import { CheckService } from "./context/check/check.service";
import { TerminusModule } from "@nestjs/terminus";

@Module({
    controllers: [CheckController],
    providers: [CheckService],
    imports: [TerminusModule]
})

export class HealthModule {}