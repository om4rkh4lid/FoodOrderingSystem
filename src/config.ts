import * as environment from "dotenv";

environment.config({ path: __dirname + '/../.env'});

const toBoolean = (value: string) => {
  return value.toLowerCase() === 'true';
}

const {
  NODE_ENV,
  PORT,
  HOST,
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_DATABASE,
  PG_PASSWORD,
  PG_SSL,
} = process.env;

const server = {
  mode: NODE_ENV!,
  port: parseInt(PORT!),
  host: HOST!,
}

const database = {
  host: PG_HOST!,
  port: parseInt(PG_PORT!),
  user: PG_USER!,
  database: PG_DATABASE!,
  password: PG_PASSWORD!,
  ssl: toBoolean(PG_SSL!)
}

const Config = {
  server,
  database
}

console.log('config', Config);

export default Config;