import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  product_name: string;

  @Column()
  category: string;

  @Column()
  supplier: string;

  @Column()
  price: string;

  @Column()
  stock_quantity: number;

  @Column()
  is_available: boolean;

}
