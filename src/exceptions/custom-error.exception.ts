import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomErrorException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    const response = {
      success: false,
      error: message,
      statusCode: statusCode,
    };
    super(response, statusCode);
  }
}
