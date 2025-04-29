import { Controller, Get } from '@nestjs/common';
import { CheckService } from './check.service';
import { HealthCheck } from '@nestjs/terminus';

@Controller('healths')
export class CheckController {
  constructor(private readonly service: CheckService) {}

  @Get()
  @HealthCheck()
  public execute() {
    return this.service.execute();
  }
}
