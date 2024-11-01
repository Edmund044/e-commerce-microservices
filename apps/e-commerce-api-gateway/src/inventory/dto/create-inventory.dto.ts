export class CreateInventoryDto {
    product_id: number;
    product_name: string;
    category: string;
    supplier: string;
    price: string;
    stock_quantity: number;
    is_available: boolean;
}
