export class CreateOrderDto {

    customer_name: string;
    customer_email: string;
    shipping_address: string;
    // @Column('jsonb')
    // items: { productId: number; quantity: number; price: number }[];
    total_amount: number;
    status: string;
  }