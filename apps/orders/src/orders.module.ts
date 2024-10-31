import { Module } from '@nestjs/common';
// import { OrdersController } from './orders.controller';
// import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_username',
    password: 'your_password',
    database: 'order_db',
    autoLoadEntities: true,
    synchronize: true, // Disable in production
  }),
    OrdersModule],
  // controllers: [OrdersController],
  // providers: [OrdersService],
})
export class OrdersAModule {}
