import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'INVENTORY_CLIENT',
        transport: Transport.TCP,
        options: { 
          host: 'localhost',
          port: 3002 },
      }
    ])
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
