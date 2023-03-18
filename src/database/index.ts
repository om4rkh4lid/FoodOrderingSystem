import { Pool } from "pg";

class Database {
  private pool: Pool;
  
  constructor() {
    this.pool = new Pool({
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT!),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      ssl: false,
    });
  }

  query = async (query: string) => {
    return await this.pool.query(query);
  }

}

export default Database;