import { Controller, Get } from '@nestjs/common';
import { ECommerceApiGatewayService } from './e-commerce-api-gateway.service';

@Controller()
export class ECommerceApiGatewayController {
  constructor(private readonly eCommerceApiGatewayService: ECommerceApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.eCommerceApiGatewayService.getHello();
  }
}
