import { OrderItem } from "../types/order-item";

export interface Order {
  orderId?: number;
  clientId: number;
  restaurantId: number;
  addressId: number;
  orderItems: OrderItem[];
}