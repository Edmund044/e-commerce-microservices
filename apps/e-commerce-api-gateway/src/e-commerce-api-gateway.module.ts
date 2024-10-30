import { Module } from '@nestjs/common';
import { ECommerceApiGatewayController } from './e-commerce-api-gateway.controller';
import { ECommerceApiGatewayService } from './e-commerce-api-gateway.service';

@Module({
  imports: [],
  controllers: [ECommerceApiGatewayController],
  providers: [ECommerceApiGatewayService],
})
export class ECommerceApiGatewayModule {}
