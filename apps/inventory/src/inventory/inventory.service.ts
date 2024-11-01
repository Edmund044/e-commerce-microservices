import { Injectable, Logger } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { trace } from '@opentelemetry/api';
import { InventoryRespository } from './inventory.repository';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
 
  constructor(
    @InjectRepository(InventoryRespository)
    private inventoryRepository: InventoryRespository,
  ) {}

  async findOne(productId: number) {
    this.logger.log(`Checking availability for product ID: ${productId}`);
    // return `find one ${productId}`
    const tracer = trace.getTracer('inventory-service');
    return await tracer.startActiveSpan('InventoryService.findOne', async (span) => {
      try {
        this.logger.log(`Checking availability for product ID: ${productId}`);
        const inventory = await this.inventoryRepository.findOne({ where: { productId } });
        if (!inventory) {
          this.logger.warn(`Product with ID: ${productId} not found in inventory`);
        }
        return inventory;
      } catch (error) {
        span.recordException(error);
        throw error;
      } finally {
        span.end();
      }
    });
  }

  async bulkCheck(products: { productId: number; quantity: number }[]) {
    this.logger.log(`Bulk checking availability for ${products.length} products`);
    return 'Bulk checking'
    // return Promise.all(
    //   products.map(async (product) => {
    //     const inventory = await this.inventoryRepository.findOne({ where: { productId: product.productId } });
    //     const available = inventory && inventory.quantity >= product.quantity;
    //     this.logger.debug(`Product ID: ${product.productId}, Requested: ${product.quantity}, Available: ${available}`);
    //     return { productId: product.productId, available };
    //   }),
    // );
  }
  async updateInventory(productId: number, quantity: number) {
    this.logger.log(`Updating inventory for product ID: ${productId} to new quantity: ${quantity}`);
    return 'updating inventory'
    // const result = await this.inventoryRepository.update({ productId }, { quantity });
    // if (result.affected) {
    //   this.logger.log(`Inventory updated successfully for product ID: ${productId}`);
    // } else {
    //   this.logger.warn(`Failed to update inventory for product ID: ${productId}`);
    // }
    // return result;
  }
}
