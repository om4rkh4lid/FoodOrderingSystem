import { restaurants } from "../data/restaurants"

class RestaurantService {
  getAllRestaurants = async () => {
    return restaurants;
  }
}

export default RestaurantService