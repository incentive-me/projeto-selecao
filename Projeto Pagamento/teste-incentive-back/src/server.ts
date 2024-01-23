import express from "express";
import { env } from "./env";
import routes from "./routes";
import cors from "cors";

const main = async () => {
  const port = env.PORT;

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(routes);

  app.listen(port, () => console.log(`running on port ${port}!`));
};

main();
