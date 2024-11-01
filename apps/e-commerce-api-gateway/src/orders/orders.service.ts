import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class OrdersService {

  private readonly logger = new Logger(OrdersService.name);
  constructor(@Inject('ORDERS_CLIENT') private ordersClient: ClientProxy){}

  create(createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('orders.createOrder',{...createOrderDto})
  }

  findAll(page: number, pageSize: number) {
    this.logger.log(`Listing orders - Page: ${page}, Page Size:${pageSize}`);
    return this.ordersClient.send('orders.findAllOrders',{page,pageSize})
  }

  findOne(id: number) {
    return this.ordersClient.send('orders.findOneOrder',id)
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    this.logger.log(`Received request to update order with ID: ${id} and status: ${updateOrderDto.status} `);
    return this.ordersClient.send('orders.updateOrder',{id:id,...updateOrderDto})
  }

}
