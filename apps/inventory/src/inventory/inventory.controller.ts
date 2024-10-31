import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller()
export class InventoryController {
  private readonly logger = new Logger(InventoryController.name);
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern('inventory.findOneInventory')
  findOne(@Payload() id: number) {
    this.logger.log(`Received request to get product availability for product ID: ${id}`);
    return this.inventoryService.findOne(id);
  }

  @MessagePattern('inventory.bulkCheckInventory')
  bulkCheck(@Payload() products: { productId: number; quantity: number }[]) {
    this.logger.log(`Received bulk availability check for ${products.length} products`);
    return this.inventoryService.bulkCheck(products)
  }

  @MessagePattern('inventory.updateInventory')
   update(@Payload('productId') productId: number, @Payload('quantity') quantity: number) {
    this.logger.log(`Received request to update inventory for product ID: ${productId}`);
    return this.inventoryService.updateInventory(productId, quantity);
  }
}
