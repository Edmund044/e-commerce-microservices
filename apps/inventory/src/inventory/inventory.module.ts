import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryRespository } from './inventory.repository';

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
      entities: [__dirname + '/../**/*.entity.{js,ts}']
    }),
    TypeOrmModule.forFeature([InventoryRespository]),
      // CacheModule.register({
      //   ttl: 5000, // Cache expiration time in milliseconds
      //   max: 10, // Maximum number of items in cache
      // }),
     RateLimiterModule.register({
      points: 10, // 10 requests
      duration: 60, // per 60 seconds (1 minute)
      keyPrefix: 'global', // useful for identifying limits across multiple instances
    }),],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
