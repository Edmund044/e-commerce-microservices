import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';

const mockInventoryRepository = () => ({
  findOne: jest.fn(),
  update: jest.fn(),
});

describe('InventoryService', () => {
  let service: InventoryService;
  let repository: Repository<Inventory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: getRepositoryToken(Inventory),
          useFactory: mockInventoryRepository,
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    repository = module.get<Repository<Inventory>>(getRepositoryToken(Inventory));
  });

  it('should return product availability', async () => {
    const inventory = { productId: 1, quantity: 10 };
    (repository.findOne as jest.Mock).mockResolvedValue(inventory);

    const result = await service.findOne(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { productId: 1 } });
    expect(result).toEqual(inventory);
  });

  it('should bulk check product availability', async () => {
    const products = [{ productId: 1, quantity: 5 }];
    const inventory = { productId: 1, quantity: 10 };
    (repository.findOne as jest.Mock).mockResolvedValue(inventory);

    const result = await service.bulkCheck(products);
    expect(result).toEqual([{ productId: 1, available: true }]);
  });

  it('should update inventory quantity', async () => {
    const productId = 1;
    const quantity = 20;
    (repository.update as jest.Mock).mockResolvedValue({ affected: 1 });

    await service.updateInventory(productId, quantity);
    expect(repository.update).toHaveBeenCalledWith({ productId }, { quantity });
  });
});
