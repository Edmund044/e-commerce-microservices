import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory/inventory.module';
import { MicroserviceOptions,Transport } from '@nestjs/microservices';
import '../../library/tracing/opentelemetry'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      }
    }

  );
  await app.listen();
}
bootstrap();
