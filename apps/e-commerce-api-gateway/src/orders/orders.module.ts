import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'ORDERS_CLIENT',
        transport: Transport.TCP,
        options: { 
          host: 'localhost',
          port: 3001 },
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
