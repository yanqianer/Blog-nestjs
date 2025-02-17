
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  
  @Catch()
  export class CatchEverythingFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();
  
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : (exception as any)?.message || 'Internal server error???';

      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message:message,
      };
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
//   import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// import { Response } from 'express';

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();

//     let status = 500;
//     let message = '服务器内部错误';

//     if (exception instanceof HttpException) {
//       status = exception.getStatus();
//       message = exception.getResponse();
//     }

//     response.status(status).json({
//       statusCode: status,
//       message,
//       timestamp: new Date().toISOString(),
//     });
//   }
// }
