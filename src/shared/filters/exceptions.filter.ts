import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, HttpStatus } from '@nestjs/common';

@Catch()
export default class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? exception.message : 'Internal Server Error';

    response.status(status).send({
      success: false,
      message,
      statusCode: status,
      errors: this.getValidationErrors(exception),
    });
  }

  getValidationErrors(exception: unknown) {
    if (exception instanceof BadRequestException) {
      const message = exception.getResponse();

      if (typeof message === 'object') {
        return (message as any).errors;
      }
    }

    return [];
  }
}
