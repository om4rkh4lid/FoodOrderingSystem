import { Client } from "pg";


export const getDatabaseClient = (): Client => {
  console.log(process.env);
  const client: Client = new Client({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT!),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: false,
  });
  return client;
}



