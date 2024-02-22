import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { routerDish } from "./routes/DishRouter";
import { routerUser } from "./routes/UserRouter";
import { Database } from "./db/Database";

const app = express();
const jsonBodyParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(jsonBodyParser);
app.use(urlParser);
app.use(routerDish);
app.use(routerUser);

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`server is running on port: ${process.env.PORT}`);

  const database = new Database();
  database.connect();
});
