import { EntityRepository, Repository } from "typeorm";
import { Inventory } from './entities/inventory.entity';

@EntityRepository(Inventory)
export class InventoryRespository extends Repository<Inventory>{}