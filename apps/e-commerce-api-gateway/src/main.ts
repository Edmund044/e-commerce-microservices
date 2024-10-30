import { NestFactory } from '@nestjs/core';
import { ECommerceApiGatewayModule } from './e-commerce-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ECommerceApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
