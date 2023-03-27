import Database from "../database";
import Restaurant from "../entities/restaurant";
import SearchableRepository from "../interfaces/searchableRepository";
import SearchCriteria from "../types/searchCriteria";

class RestaurantRepository implements SearchableRepository<Restaurant> {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  async findWhere(searchCriteria: SearchCriteria<Restaurant>): Promise<Restaurant[]> {
    let query = 'SELECT * FROM restaurants';

    if (searchCriteria.name?.like) {
      query += ` WHERE LOWER(name) LIKE LOWER('%${searchCriteria.name.like}%')`;
    }

    query += ';';
    
    const result = await this.database.query(query);

    if (result.rowCount > 0) {
      const restaurants: Restaurant[] = result.rows.map(row => new Restaurant(row.restaurant_id, row.name, row.delivery_time, []));
      return restaurants;
    }

    return [];

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
      const restaurant: Restaurant = new Restaurant(row.restaurant_id, row.name, row.delivery_time, []);
      return restaurant;
    }

    return null;
  }

  findAll = async () => {
    const result = await this.database.query('SELECT * FROM restaurants AS r INNER JOIN restaurant_categories AS rc ON r.restaurant_id = rc.restaurant_id INNER JOIN categories AS c ON rc.category_id = c.category_id;');

    if (result.rowCount > 0) {
      const restaurants = result.rows.reduce<Restaurant[]>((finalResult, currentValue) => {
        const found = finalResult.find(restaurant => restaurant.restaurantId === currentValue.restaurant_id);
        if (found) {
          found.categories.push(currentValue.category_name);
        } else {
          finalResult.push(new Restaurant(currentValue.restaurant_id, currentValue.name, currentValue.delivery_time, [currentValue.category_name]));
        }

        return finalResult;
      }, []);

      console.log(restaurants);

      return restaurants;
    }

    return [];
  }


}

export default RestaurantRepository;