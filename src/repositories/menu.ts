import Database from "../database";
import MenuItem from "../entities/menu-item";

class MenuRepository {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  findByRestaurantId = async (id: number): Promise<MenuItem[]> => {

    const result = await this.database.query(`SELECT * FROM menu_items WHERE restaurant_id=${id};`);
    
    console.log(result.rows);

    if (result.rowCount > 0) {
      const items: MenuItem[] = result.rows.map(item => new MenuItem(item.item_id, item.name, item.price, item.description, item.photo_url));
      console.log(items);
      return items;
    }

    return [];
  }

}

export default MenuRepository;