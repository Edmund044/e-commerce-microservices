import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Controller()
export class InventoryController {
  private readonly logger = new Logger(InventoryController.name);
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern('inventory.createInventory')
  async create(@Payload() inventoryData: Partial<Inventory>) {
    this.logger.log('Received request to create a new inventory');
    return await this.inventoryService.create(inventoryData);
  }

  @MessagePattern('inventory.findOneInventory')
  findOne(@Payload() id: number) {
    this.logger.log(`Received request to get product availability for product ID: ${id}`);
    return this.inventoryService.findOne(id);
  }

  @MessagePattern('inventory.bulkCheckInventory')
  bulkCheck(@Payload() products: { product_id: number; quantity: number }[]) {
    this.logger.log(`Received bulk availability check for ${products.length} products`);
    return this.inventoryService.bulkCheck(products)
  }

  @MessagePattern('inventory.updateInventory')
   update(@Payload() inventoryData: Partial<Inventory>) {
    this.logger.log(`Received request to update inventory for product ID: ${inventoryData.product_id}`);
    return this.inventoryService.updateInventory(inventoryData);
  }
}
