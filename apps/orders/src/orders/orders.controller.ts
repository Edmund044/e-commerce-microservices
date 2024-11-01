import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity'

@Controller()
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);

  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('orders.createOrder')
  async create(@Payload() orderData: Partial<Order>) {
    this.logger.log('Received request to create a new order');
    return await this.ordersService.create(orderData);
  }

  @MessagePattern('orders.findAllOrders')
  findAll(@Payload() payload: any) {
    this.logger.log(`Listing orders - Page: ${payload.page}, Page Size:${payload.pageSize}`);
    return this.ordersService.findAll(Number(payload.page), Number(payload.pageSize));
  }
  @MessagePattern('orders.findOneOrder')
  findOne(@Payload() id: number) {
    this.logger.log(`Received request to fetch order with ID: ${id}`);
    return this.ordersService.findOne(id);
  }

  @MessagePattern('orders.updateOrder')
  update(@Payload() orderData: Partial<Order>) {
    this.logger.log(`Received request to update order with ID: ${orderData} and status: ${orderData.status} `);
    return this.ordersService.updateStatus(orderData);
  }

}
