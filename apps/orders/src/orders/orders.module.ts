import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  imports: [   
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-silent-wood-a5ndpfqn.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'trial-db_owner',
      password: 'u2DemFOhR4WL',
      database: 'e-commerce-app',
      autoLoadEntities: true,
      ssl: true,
      synchronize: true, 
    }),
  TypeOrmModule.forFeature([Order]),
   RateLimiterModule.register({
    points: 10, // 10 requests
    duration: 60, // per 60 seconds (1 minute)
    keyPrefix: 'global', // useful for identifying limits across multiple instances
  }),
    OrdersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
