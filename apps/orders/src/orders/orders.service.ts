import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { trace } from '@opentelemetry/api';
import { OrderRespository } from './orders.repository';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>){}

 async create(orderData: Partial<Order>) {
  const tracer = trace.getTracer('order-service');
  this.logger.log('Creating a new order');
  return await tracer.startActiveSpan('OrderService.create', async (span) => {
    try {
      this.logger.log('Creating a new order');
      const order = this.orderRepository.create(orderData);
      const savedOrder = await this.orderRepository.save(order);
      this.logger.log(`Order created with ID: ${savedOrder.id}`);
      return order;
    } catch (error) {
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });
  }

 async findOne(id: number) {
  const tracer = trace.getTracer('order-service');
  return await tracer.startActiveSpan('OrderService.findOne', async (span) => {
    try {
      this.logger.log(`Fetching order with ID: ${id}`);
      const order = await this.orderRepository.findOne({ where: { id:id } });
      if (!order) {
        this.logger.warn(`Order with ID: ${id} not found`);
      }
      return order;
    } catch (error) {
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });

  }
  async findAll(page: number, pageSize: number) {
    const tracer = trace.getTracer('order-service');
    return await tracer.startActiveSpan('OrderService.findAll', async (span) => {
      try {
        this.logger.log(`Fetching orders with on page :${page} and pageSize:${pageSize} and skip : ${(page - 1) * pageSize}`);
        return await this.orderRepository.find({
          skip: (page - 1) * pageSize,
          take: pageSize,
        });
      } catch (error) {
        span.recordException(error);
        throw error;
      } finally {
        span.end();
      }
    });
    }

  async updateStatus(orderData: Partial<Order>) {
    const tracer = trace.getTracer('order-service')
    return await tracer.startActiveSpan('OrderService.updateStatus', async(span) =>{
      try {
        this.logger.log(`Updating status for order ID: ${orderData.id} to ${orderData.status}`);
        const result = await this.orderRepository.update(orderData.id, { status: orderData.status });
        if (result) {
          this.logger.log(`Order status updated successfully for ID: ${orderData.id}`);
        } else {
          this.logger.warn(`Failed to update order status for ID: ${orderData.id}`);
        }
        return result;

      }
      catch (error) {
        span.recordException(error)
        throw error;
      }
      finally{
        span.end()
      }
    });
  }

  }


