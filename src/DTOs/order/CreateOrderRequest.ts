import { OrderItem } from "../../types/order-item";

export type CreateOrderRequestDTO = {
  clientId: number;
  restaurantId: number;
  addressId: number;
  orderItems: OrderItem[];
}