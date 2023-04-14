import OrderRepository from "../repositories/order";
import { OrderItem } from "../types/order-item";

class OrderService {
  constructor(private readonly repository: OrderRepository) { }

  async create(clientId: number, restaurantId: number, addressId: number, orderItems: OrderItem[]) {
    return this.repository.create({ clientId, restaurantId, addressId, orderItems });
  }
}

export default OrderService;