import Database from "../database";
import MenuItem from "../entities/menu-item";

class MenuRepository {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  findByRestaurantId = async (id: number): Promise<MenuItem[]> => {

    const result = await this.database.query(`SELECT * FROM menu_items WHERE restaurant_id=${id};`);

    if (result.rowCount > 0) {
      const items: MenuItem[] = this.reduce(result.rows);
      return items;
    }

    return [];
  }

  findByItemId = async (id: number): Promise<MenuItem | null> => {
    const result = await this.database.query(`SELECT * FROM menu_items WHERE item_id=${id};`);

    if (result.rowCount > 0) {
      const items: MenuItem[] = this.reduce(result.rows);
      return items[0];
    }
    
    return null;
  }

  findItems =async (idList: number[]) => {
    const result = await this.database.query(`SELECT * FROM menu_items WHERE item_id in (${idList.join(', ')});`);

    if (result.rowCount > 0) {
      const items: MenuItem[] = this.reduce(result.rows);
      return items;
    }
    
    return [];
  }

  private reduce = (queryResult: any[]): MenuItem[] => {
    const results = queryResult.map(item => new MenuItem(item.item_id, item.name, item.price, item.description, item.photo_url, item.restaurant_id));
    console.log(results);
    return results;
  }

}

export default MenuRepository;