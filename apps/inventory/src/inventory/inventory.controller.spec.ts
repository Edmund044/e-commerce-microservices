import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

const mockInventoryService = () => ({
  findOne: jest.fn(),
  bulkCheck: jest.fn(),
  updateInventory: jest.fn(),
});

describe('InventoryController', () => {
  let controller: InventoryController;
  let service: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useFactory: mockInventoryService,
        },
      ],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
    service = module.get<InventoryService>(InventoryService);
  });

  it('should get product availability', async () => {
    const product = { productId: 1, quantity: 10 };
    (service.findOne as jest.Mock).mockResolvedValue(product);

    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(product);
  });

  it('should bulk check product availability', async () => {
    const products = [{ productId: 1, quantity: 5 }];
    (service.bulkCheck as jest.Mock).mockResolvedValue([{ productId: 1, available: true }]);

    const result = await controller.bulkCheck(products);
    expect(service.bulkCheck).toHaveBeenCalledWith(products);
    expect(result).toEqual([{ productId: 1, available: true }]);
  });
});
