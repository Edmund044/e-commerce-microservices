import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_username',
    password: 'your_password',
    database: 'inventory_db',
    autoLoadEntities: true,
    synchronize: true,
  }),
  InventoryModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
