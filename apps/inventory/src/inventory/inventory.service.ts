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
 
  constructor(@InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>){}

  async create(InventoryData: Partial<Inventory>) {
    const tracer = trace.getTracer('Inventory-service');
    this.logger.log('Creating a new Inventory');
    return await tracer.startActiveSpan('InventoryService.create', async (span) => {
      try {
        this.logger.log('Creating a new Inventory');
        const inventory = this.inventoryRepository.create(InventoryData);
        const savedInventory = await this.inventoryRepository.save(inventory);
        this.logger.log(`Inventory created with ID: ${savedInventory.product_id}`);
        return inventory;
      } catch (error) {
        span.recordException(error);
        throw error;
      } finally {
        span.end();
      }
    });
    }
  

  async findOne(productId: number) {
    this.logger.log(`Checking availability for product ID: ${productId}`);
    const tracer = trace.getTracer('inventory-service');
    return await tracer.startActiveSpan('InventoryService.findOne', async (span) => {
      try {
        this.logger.log(`Checking availability for product ID: ${productId}`);
        const inventory = await this.inventoryRepository.findOne({ where: { product_id:productId } });
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

  async bulkCheck(products: { product_id: number; quantity: number }[]) {
    this.logger.log(`Bulk checking availability for ${products.length} products`);
    return Promise.all(
      products.map(async (product) => {
        const inventory = await this.inventoryRepository.findOne({ where: { product_id: product.product_id } });
        const available = inventory && inventory.stock_quantity >= product.quantity;
        this.logger.debug(`Product ID: ${product.product_id}, Requested: ${product.quantity}, Available: ${available}`);
        return { productId: product.product_id, available };
      }),
    );
  }
  async updateInventory(inventoryData: Partial<Inventory>) {
    this.logger.log(`Updating inventory for product ID: ${inventoryData.product_id} to new quantity: ${inventoryData.stock_quantity}`);
    const tracer = trace.getTracer('inventory-service');
    return await tracer.startActiveSpan('InventoryService.findOne', async (span) => {
      try {
        const result = await this.inventoryRepository.update(inventoryData.product_id, { 
          product_name: inventoryData.product_name,
          category: inventoryData.category,
          supplier: inventoryData.supplier,
          price: inventoryData.price,
          stock_quantity: inventoryData.stock_quantity
         });
        if (result.affected) {
          this.logger.log(`Inventory updated successfully for product ID: ${inventoryData.product_id}`);
        } else {
          this.logger.warn(`Failed to update inventory for product ID: ${inventoryData.product_id}`);
        }
        return result;
      } catch (error) {
        span.recordException(error);
        throw error;
      } finally {
        span.end();
      }
    });
  }
}
