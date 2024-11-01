import { Controller, Get, Post, Body, Patch, Param, Logger, Query} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('api/orders')
export class OrdersController {

  private readonly logger = new Logger(OrdersController.name);
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
    return this.ordersService.findAll(Number(page), Number(pageSize));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    this.logger.log(`Received request to update order with ID: ${id} and status: ${updateOrderDto.status} `);
    return this.ordersService.update(id, updateOrderDto);
  }

}
