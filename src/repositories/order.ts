import { CreateOrderRequestDTO } from "../DTOs/order/CreateOrderRequest";
import { CreateOrderResponse } from "../DTOs/order/CreateOrderResponse";
import Database from "../database";
import { Client, Order } from "../entities/Order";
import Address from "../entities/address";
import MenuItem from "../entities/menu-item";
import Restaurant from "../entities/restaurant";
import Repository from "../interfaces/repository";

class OrderRepository {
  database: Database;

  constructor() {
    this.database = new Database()
  }

  async create(entity: CreateOrderRequestDTO): Promise<CreateOrderResponse> {
    let createOrderQuery = 'INSERT INTO orders(client_id, restaurant_id, address_id)';
    createOrderQuery += `VALUES('${entity.clientId}', ${entity.restaurantId}, ${entity.addressId}) RETURNING order_id;`;
    const createOrderQueryResult = await this.database.query(createOrderQuery);

    if (createOrderQueryResult.rowCount > 0) {
      const orderId = createOrderQueryResult.rows[0].order_id;
      let createOrderItemsQuery = 'INSERT INTO order_items(order_id, item_id, qty) VALUES';

      entity.orderItems.forEach((item, index) => {
        createOrderItemsQuery += `(${orderId}, ${item.itemId}, ${item.qty})`
        createOrderItemsQuery += index < entity.orderItems.length - 1 ? ', ' : ';';
      })

      const createOrderItemsQueryResult = await this.database.query(createOrderItemsQuery);
      return { orderId };
    } else {
      throw new Error('Something went wrong while creating the order');
    }
  }

  async findById(id: any): Promise<Order | null> {
    let query = `SELECT *, r.name as restaurant_name, mi.name as item_name, mi.photo_url as item_photo, r.photo_url as restaurant_photo FROM orders AS o INNER JOIN delivery_addresses AS da ON o.address_id = da.address_id                              
    INNER JOIN restaurants AS r ON o.restaurant_id = r.restaurant_id INNER JOIN clients AS c ON o.client_id = c.client_id                                                                      
    INNER JOIN order_items AS oi ON oi.order_id = o.order_id INNER JOIN menu_items AS mi ON mi.item_id = oi.item_id 
    INNER JOIN areas AS a ON a.id = da.area_id WHERE o.order_id = ${id};`;
    const result = await this.database.query(query);
    return result.rowCount > 0 ? this.reduceOrder(result.rows)[0] : null;
  }

  reduceOrder(queryResult: any[]): Order[] {
    const orders = queryResult.reduce<Order[]>((final, current) => {
      const found = final.find(order => order.orderId === current.order_id)
      if (found) {
        const menuItem = new MenuItem(current.item_id, current.item_name, current.price, current.description, current.item_photo, current.restaurant_id);
        found.items.push({ item: menuItem, qty: current.qty });
      } else {
        const restaurant = new Restaurant(current.restaurant_id, current.restaurant_name, current.delivery_time, [], current.restaurant_photo);
        const client: Client = { clientId: current.client_id, firstName: current.first_name, lastName: current.last_name };
        const address = new Address(current.address_id, current.client_id, current.area_name, current.street, current.building, current.floor_number, current.description, current.alias);
        const menuItem = new MenuItem(current.item_id, current.item_name, current.price, current.description, current.item_photo, current.restaurant_id);
        const orderItem = { item: menuItem, qty: current.qty };
        const order: Order = { orderId: current.order_id, restaurant, client, address, items: [orderItem], status: current.status };
        final.push(order);
      }
      return final;
    }, [] as Order[]);
    return orders;
  }

}

export default OrderRepository;