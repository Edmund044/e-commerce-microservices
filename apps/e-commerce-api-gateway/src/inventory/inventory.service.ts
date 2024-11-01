import { Inject,Injectable, Logger } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class InventoryService {

  private readonly logger = new Logger(InventoryService.name);
  constructor(@Inject('INVENTORY_CLIENT') private inventoryClient: ClientProxy){}

  create(createInventoryDto: CreateInventoryDto) {
    return this.inventoryClient.send('inventory.createInventory',{...createInventoryDto})
  }

  bulkCheck(products: { product_id: number; quantity: number }[]) {
    this.logger.log(`Bulk checking ${products.length} products `);
    return this.inventoryClient.send('inventory.bulkCheckInventory',products)
  }

  findOne(id: number) {
    return this.inventoryClient.send('inventory.findOneInventory',id)
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryClient.send('inventory.updateInventory',{product_id:id,...updateInventoryDto})
  }

}
