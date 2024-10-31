import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column()
  shippingAddress: string;

  @Column('jsonb')
  items: { productId: number; quantity: number; price: number }[];

  @Column('decimal')
  totalAmount: number;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED';

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
