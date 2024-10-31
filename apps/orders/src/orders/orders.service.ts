import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { trace } from '@opentelemetry/api';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

 async create(orderData: Partial<Order>) {
  const tracer = trace.getTracer('order-service');
  return await tracer.startActiveSpan('OrderService.create', async (span) => {
    try {
      this.logger.log('Creating a new order');
      const order = this.orderRepository.create(orderData);
      const savedOrder = await this.orderRepository.save(order);
      this.logger.log(`Order created with ID: ${savedOrder.id}`);
      return savedOrder;
    } catch (error) {
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });
  }

 async findOne(id: number) {
  this.logger.log(`Fetching order with ID: ${id}`);
  const order = await this.orderRepository.findOne(id);
  if (!order) {
    this.logger.warn(`Order with ID: ${id} not found`);
  }
  return order;

  }

  async updateStatus(id: number, status: string) {
    this.logger.log(`Updating status for order ID: ${id} to ${status}`);
    const result = await this.orderRepository.update(id, { status });
    if (result.affected) {
      this.logger.log(`Order status updated successfully for ID: ${id}`);
    } else {
      this.logger.warn(`Failed to update order status for ID: ${id}`);
    }
    return result;
  }

  }


