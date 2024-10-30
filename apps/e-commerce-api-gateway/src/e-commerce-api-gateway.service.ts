import { Injectable } from '@nestjs/common';

@Injectable()
export class ECommerceApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
