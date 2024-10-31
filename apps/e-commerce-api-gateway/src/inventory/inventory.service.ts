import { Inject,Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class InventoryService {

  constructor(@Inject('INVENTORY_CLIENT') private inventoryClient: ClientProxy){}

  bulkCheck() {
    return this.inventoryClient.send('inventory.bulkCheckInventory',{})
  }

  findOne(id: number) {
    return this.inventoryClient.send('inventory.findOneInventory',{})
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryClient.send('inventory.updateInventory',{})
  }

}
