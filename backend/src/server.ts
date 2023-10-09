import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connection } from "./db/connection";
import { routerFood } from "./routes/FoodRouter";
import { routerOrders } from "./routes/OrdersRouter";

const app = express();
const jsonBodyParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(jsonBodyParser);
app.use(urlParser);
app.use(routerFood);
app.use(routerOrders);

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`server is running on port: ${process.env.PORT}`);

  await connection();
});
