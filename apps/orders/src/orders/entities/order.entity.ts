import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_name: string;

  @Column()
  customer_email: string;

  @Column()
  shipping_address: string;

  // @Column('jsonb')
  // items: { productId: number; quantity: number; price: number }[];

  @Column('decimal')
  total_amount: number;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED';

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
