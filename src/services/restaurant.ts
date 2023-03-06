import { restaurants } from "../data/restaurants"

class RestaurantService {
  getAllRestaurants = async () => {
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