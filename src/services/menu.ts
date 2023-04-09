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

  findItemById = async (itemId: number) => {
    return await this.repository.findByItemId(itemId)
  }

  findItems = async (idList: number[]) => {
    return await this.repository.findItems(idList);
  }

}

export default MenuService;