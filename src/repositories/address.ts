import Database from "../database";
import Address from "../entities/address";
import SearchableRepository from "../interfaces/searchableRepository";
import SearchCriteria from "../types/searchCriteria";

class AddressRepository implements SearchableRepository<Address> {
  private database;

  constructor() {
    this.database = new Database();
  }

  findWhere = async (searchCriteria: SearchCriteria<Address>): Promise<Address[]> => {
    let query = 'SELECT * FROM delivery_addresses';

    if (searchCriteria.userId?.equals) {
      query += ` WHERE user_id = ${searchCriteria.userId.equals}`;
    }

    query += ';'

    const result = await this.database.query(query);

    if (result.rowCount > 0) {
      return this.reduce(result.rows);
    }

    return [];
  }

  private reduce = (queryResult: any[]): Address[] => {
    const results = queryResult.map(item => new Address(item.address_id, item.user_id, item.street, item.building, item.floor_number, item.description, item.alias));
    console.log(results);
    return results;
  }

  create(entity: Address): Promise<Address> {
    throw new Error("Method not implemented.");
  }
  findById(id: any): Promise<Address | null> {
    throw new Error("Method not implemented.");
  }
  update(id: any, updates: any): Promise<Address | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Address[]> {
    throw new Error("Method not implemented.");
  }

}

export default AddressRepository;