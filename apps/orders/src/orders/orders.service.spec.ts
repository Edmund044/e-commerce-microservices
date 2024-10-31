import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { NotFoundException } from '@nestjs/common';


const mockOrderRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
});

describe('OrderService', () => {
  let service: OrdersService;
  let repository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useFactory: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should create an order', async () => {
    const orderData = { customerName: 'John Doe', totalAmount: 100 };
    (repository.findOne as jest.Mock).mockReturnValue(orderData);
    (repository.findOne as jest.Mock).mockResolvedValue(orderData);

    const result = await service.create(orderData);
    expect(repository.create).toHaveBeenCalledWith(orderData);
    expect(repository.save).toHaveBeenCalledWith(orderData);
    expect(result).toEqual(orderData);
  });

  it('should return all orders', async () => {
    const orders = [{ id: 1, customerName: 'John Doe' }];
    (repository.findOne as jest.Mock).mockResolvedValue(orders);

    const result = await service.findAll(1, 10);
    expect(result).toEqual(orders);
    expect(repository.find).toHaveBeenCalledWith({ skip: 0, take: 10 });
  });

  it('should return a single order by ID', async () => {
    const order = { id: 1, customerName: 'John Doe' };
    (repository.findOne as jest.Mock).mockResolvedValue(order);

    const result = await service.findOne(1);
    expect(result).toEqual(order);
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if order not found', async () => {
    (repository.findOne as jest.Mock).mockResolvedValue(undefined);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update the order status', async () => {
    const orderId = 1;
    const status = 'CONFIRMED';
    (repository.update as jest.Mock).mockResolvedValue({ affected: 1 });

    await service.updateStatus(orderId, status);
    expect(repository.update).toHaveBeenCalledWith(orderId, { status });
  });
});