import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private httpAdapterHost: HttpAdapterHost,
    private loggingService: LoggingService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const resBody = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    const message = this.generateMessage(request, statusCode);

    this.loggingService.debug(message);
    this.httpAdapterHost.httpAdapter.reply(response, resBody, statusCode);
  }

  generateMessage(request: Request, statusCode): string {
    const query = JSON.stringify(request.query);
    const body = JSON.stringify(request.body);
    return `${request.method} ${request.url} ${statusCode} ${query} ${body}`;
  }
}
