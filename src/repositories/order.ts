import Database from "../database";
import { Order } from "../entities/Order";
import Repository from "../interfaces/repository";

class OrderRepository implements Repository<Order> {
  database: Database;

  constructor() {
    this.database = new Database()
  }

  async create(entity: Order): Promise<Order> {
    let createOrderQuery = 'INSERT INTO orders(client_id, restaurant_id, address_id)';
    createOrderQuery += `VALUES('${entity.clientId}', ${entity.restaurantId}, ${entity.addressId}) RETURNING order_id;`;
    const createOrderQueryResult = await this.database.query(createOrderQuery);

    if (createOrderQueryResult.rowCount > 0) {
      const orderId = createOrderQueryResult.rows[0].order_id;
      let createOrderItemsQuery = 'INSERT INTO order_items(order_id, item_id, qty) VALUES';
    
      entity.orderItems.forEach((item, index) =>  {
        createOrderItemsQuery += `(${orderId}, ${item.itemId}, ${item.qty})`
        createOrderItemsQuery += index < entity.orderItems.length - 1 ? ', ' : ';';
      })
    
      const createOrderItemsQueryResult = await this.database.query(createOrderItemsQuery);
      entity.orderId = orderId;
    }
    
    return entity;
  }

  findById(id: any): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }

  update(id: any, updates: any): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }

  delete(id: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}

export default OrderRepository;