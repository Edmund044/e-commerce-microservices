import { Module } from '@nestjs/common';
import { ECommerceApiGatewayController } from './e-commerce-api-gateway.controller';
import { ECommerceApiGatewayService } from './e-commerce-api-gateway.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // Rate limit window in seconds
      limit: 100, // Max requests per window
    }),
  ],
  controllers: [ECommerceApiGatewayController],
  providers: [    
    {
    provide: APP_GUARD,
    useClass: ThrottlerGuard, // Applies rate limiting globally
  },
  ECommerceApiGatewayService],
})
export class ECommerceApiGatewayModule {}
