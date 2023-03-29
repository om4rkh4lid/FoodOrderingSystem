import Config from "./config";
import Express, { static as serveStatic } from "express";
import morgan from "morgan";
import api, { rootEndpoint } from "./api";
import cors from "cors";
import { join } from "path";
const app: Express.Application = Express();

if (Config.server.mode === 'development') {
  app.use(morgan('dev'));
}

app.use(serveStatic(join(__dirname, '..', 'public')));

app.use(cors());

app.use(rootEndpoint, api);

app.listen(Config.server.port, Config.server.host, () => {
  console.log(`Listening on http://${Config.server.host}:${Config.server.port} in ${Config.server.mode} mode...`);
})