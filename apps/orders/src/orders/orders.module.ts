import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [   
  //    TypeOrmModule.forRoot({
  //   type: 'postgres',
  //   host: 'ep-silent-wood-a5ndpfqn.us-east-2.aws.neon.tech/e-commerce-app?sslmode=require',
  //   port: 5432,
  //   username: 'trial-db_owner',
  //   password: 'u2DemFOhR4WL',
  //   database: 'e-commerce-app',
  //   autoLoadEntities: true,
  //   synchronize: true, // Disable in production
  // }),
    OrdersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
