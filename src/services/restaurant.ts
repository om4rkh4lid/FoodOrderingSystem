import { Client } from "pg";
import { restaurants } from "../data/restaurants"
import Restaurant from "../entities/restaurant";

class RestaurantService {
  private repository;

  constructor(repository: Client) {
    this.repository = repository;
  }

  getAllRestaurants = async () => {
    await this.repository.connect();
    const result = await this.repository.query('SELECT * FROM restaurants;');
    const restaurants: Restaurant[] = result.rows.map(row => new Restaurant(row.user_id, row.restaurant_id, row.name, row.delivery_time));
    await this.repository.end();
    return restaurants;
  }
  findRestaurantById = async (restaurantId: number) => {
    return restaurants.find(restaurant => restaurant.restaurantId === restaurantId);
  }
  findRestaurantsWithNameLike = async (nameQuery: string) => {
    return restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(nameQuery.toLowerCase()));
  }
}

export default RestaurantService