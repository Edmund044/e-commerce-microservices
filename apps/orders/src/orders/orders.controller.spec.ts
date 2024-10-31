import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

const mockOrderService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  updateStatus: jest.fn(),
});

describe('OrderController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useFactory: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should create an order', async () => {
    const orderData = { customerName: 'John Doe', totalAmount: 100 };
    (service.create as jest.Mock).mockResolvedValue(orderData);

    const result = await controller.create(orderData);
    expect(service.create).toHaveBeenCalledWith(orderData);
    expect(result).toEqual(orderData);
  });

  it('should get a list of orders', async () => {
    const orders = [{ id: 1, customerName: 'John Doe' }];
    (service.findAll as jest.Mock).mockResolvedValue(orders);

    const result = await controller.findAll(1, 10);
    expect(service.findAll).toHaveBeenCalledWith(1, 10);
    expect(result).toEqual(orders);
  });

  it('should get a single order', async () => {
    const order = { id: 1, customerName: 'John Doe' };
    (service.findOne as jest.Mock).mockResolvedValue(order);

    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(order);
  });

  it('should update order status', async () => {
    const status = 'CONFIRMED';
    (service.updateStatus as jest.Mock).mockResolvedValue(undefined);

    const result = await controller.update(1, status);
    expect(service.updateStatus).toHaveBeenCalledWith(1, status);
    expect(result).toBeUndefined();
  });
});
