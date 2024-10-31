import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class OrdersService {

  constructor(@Inject('ORDERS_CLIENT') private ordersClient: ClientProxy){}

  create(createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('orders.createOrder',{})
  }

  findAll() {
    return this.ordersClient.send('orders.findAllOrders',{})
  }

  findOne(id: number) {
    return this.ordersClient.send('orders.findOneOrder',{})
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.ordersClient.send('orders.updateOrder',{})
  }

}
