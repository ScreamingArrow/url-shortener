import {
  Injectable,
  NestInterceptor,
  Logger,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { tap, catchError } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const response = ctx.getResponse();
    const { originalUrl, method } = response.req;

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${method} ${originalUrl} -> ${
            response ? response.statusCode : HttpStatus.INTERNAL_SERVER_ERROR
          }`,
        );
      }),
      catchError((err) => {
        const statusCode: string = err.response
          ? err.response.statusCode || err.response.status || err.status
          : HttpStatus.INTERNAL_SERVER_ERROR;

        const response: string = err.response
          ? err.response.message.text ||
            err.response.message ||
            err.response.error ||
            err.response.data.error
          : err;

        this.logger.error(
          `${method} ${originalUrl} -> [${statusCode}]: ${response} `,
        );
        throw err;
      }),
    );
  }
}
