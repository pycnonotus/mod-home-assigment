export interface CreateOrderCommand {
    orderId: string; // to prevent multiple orders
    fullName: string;
    email: string;
    items: readonly { productId: string; quantity: number }[]
}