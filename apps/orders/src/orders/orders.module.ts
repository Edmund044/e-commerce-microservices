import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
