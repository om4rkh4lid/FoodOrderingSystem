import { Pool } from "pg";
import Config from "../config";

class Database {
  private pool: Pool;
  
  constructor() {
    this.pool = new Pool(Config.database);
    // which is short for
    // this.pool = new Pool({
    //   host: Config.database.host,
    //   port: Config.database.port,
    //   user: Config.database.user,
    //   password: Config.database.password,
    //   database: Config.database.database,
    //   ssl: Config.database.ssl,
    // });
  }

  query = async (query: string) => {
    return await this.pool.query(query);
  }

}

export default Database;