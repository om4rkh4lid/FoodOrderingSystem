import Config from "./config";
import Express from "express";
import morgan from "morgan";
import api, { rootEndpoint } from "./api";

const app: Express.Application = Express();

if (Config.server.mode === 'development') {
  app.use(morgan('dev'));
}

app.use(rootEndpoint, api);

app.listen(Config.server.port, Config.server.host, () => {
  console.log(`Listening on http://${Config.server.host}:${Config.server.port} in ${Config.server.mode} mode...`);
})