import { Client } from "pg";
import Database from "../database";
import Restaurant from "../entities/restaurant";

class RestaurantRepository {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  findAll = async () => {
    const result = await this.database.query('SELECT * FROM restaurants;');

    if (result.rowCount > 0) {
      const restaurants: Restaurant[] = result.rows.map(row => new Restaurant(row.user_id, row.restaurant_id, row.name, row.delivery_time));
      return restaurants;
    }

    return null;
  }

  findById = async (id: number) => {

    const result = await this.database.query(`SELECT * FROM restaurants WHERE restaurant_id=${id};`);
    const row = result.rows[0];
    
    if (row) {
      const restaurant: Restaurant = new Restaurant(row.user_id, row.restaurant_id, row.name, row.delivery_time);
      return restaurant;
    }

    return null;
  }

  findWhereNameLike = async (name: string) => {
    const result = await this.database.query(`SELECT * FROM restaurants WHERE name LIKE '%${name}%';`);

    if (result.rowCount > 0) {
      const restaurants: Restaurant[] = result.rows.map(row => new Restaurant(row.user_id, row.restaurant_id, row.name, row.delivery_time));
      return restaurants;
    }

    return null;
  }


}

export default RestaurantRepository;