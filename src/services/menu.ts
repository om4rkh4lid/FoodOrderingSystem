import Database from "../database";
import MenuRepository from "../repositories/menu";

class MenuService {
  private repository;

  constructor(repository: MenuRepository) {
    this.repository = repository;
  }

  findForRestaurantWithId = async (restaurantId: number) => {
    return await this.repository.findByRestaurantId(restaurantId);
  }
}

export default MenuService;