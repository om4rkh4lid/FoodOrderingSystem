import { restaurants } from "../data/restaurants"

class RestaurantService {
  getAllRestaurants = async () => {
    return restaurants;
  }
  findRestaurantById =async (restaurantId: number) => {
    return restaurants.find(restaurant => restaurant.restaurantId === restaurantId)
  }
}

export default RestaurantService