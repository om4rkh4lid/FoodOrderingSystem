import { Client } from "pg";
import RestaurantRepository from "../repositories/restaurant";

class RestaurantService {
  private repository;

  constructor(repository: RestaurantRepository) {
    this.repository = repository;
  }

  getAllRestaurants = async () => {
    return await this.repository.findAll();
  }
  findRestaurantById = async (restaurantId: number) => {
    return await this.repository.findById(restaurantId);
  }
  findRestaurantsWithNameLike = async (nameQuery: string) => {
    return await this.repository.findWhereNameLike(nameQuery);
  }
}

export default RestaurantService