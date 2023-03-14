import { Client } from "pg";
import Restaurant from "../entities/restaurant";

class RestaurantRepository {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  findAll = async () => {
    await this.client.connect();
    const result = await this.client.query('SELECT * FROM restaurants;');
    await this.client.end();

    if (result.rowCount > 0) {
      const restaurants: Restaurant[] = result.rows.map(row => new Restaurant(row.user_id, row.restaurant_id, row.name, row.delivery_time));
      return restaurants;
    }

    return null;
  }

  findById = async (id: number) => {
    await this.client.connect();
    const result = await this.client.query(`SELECT * FROM restaurants WHERE restaurant_id=${id};`);
    const row = result.rows[0];
    await this.client.end();
    
    if (row) {
      const restaurant: Restaurant = new Restaurant(row.user_id, row.restaurant_id, row.name, row.delivery_time);
      return restaurant;
    }

    return null;
  }

  findWhereNameLike = async (name: string) => {
    await this.client.connect();
    const result = await this.client.query(`SELECT * FROM restaurants WHERE name LIKE '%${name}%';`);
    await this.client.end();

    if (result.rowCount > 0) {
      const restaurants: Restaurant[] = result.rows.map(row => new Restaurant(row.user_id, row.restaurant_id, row.name, row.delivery_time));
      return restaurants;
    }

    return null;
  }


}

export default RestaurantRepository;