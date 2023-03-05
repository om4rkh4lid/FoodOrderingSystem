import environment from "dotenv";
import Express from "express";
import morgan from "morgan";

environment.config();

const app: Express.Application = Express();
const mode: string = process.env.NODE_ENV!;

if (mode === 'development') {
  app.use(morgan('dev'));
}

const host: string = process.env.HOST!
const port: number = parseInt(process.env.PORT!);

app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port} in ${mode} mode...`);
})