import Database from "../database";
import Restaurant from "../entities/restaurant";
import Repository from "../interfaces/repository";

class RestaurantRepository implements Repository<Restaurant> {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  async create(entity: Restaurant): Promise<Restaurant> {
    const result = await this.database.query(`INSERT INTO restaurants(name, deliveryTime) VALUES(${entity.name}, ${entity.deliveryTime})`);
    return entity;
  }

  //TODO: CHANGE THIS
  update(id: any, updates: any): Promise<Restaurant | null> {
    throw new Error("Method not implemented.");
  }

  //TODO: CHANGE THIS
  delete(id: any): Promise<void> {
    throw new Error("Method not implemented.");
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

  findAll = async () => {
    const result = await this.database.query('SELECT * FROM restaurants;');

    if (result.rowCount > 0) {
      const restaurants: Restaurant[] = result.rows.map(row => new Restaurant(row.user_id, row.restaurant_id, row.name, row.delivery_time));
      return restaurants;
    }

    return [];
  }

  //TODO: CHANGE THIS
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