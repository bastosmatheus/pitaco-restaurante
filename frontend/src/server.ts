import express from "express";
import { URL } from "url";
import AuthMiddleware from "./scripts/middlewares/AuthMiddleware";
import dotenv from "dotenv";

const app = express();
const __dirname = new URL(".", import.meta.url).pathname.slice(1);

dotenv.config();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/dist"));

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/pages/register.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});

app.get("/cart", (req, res) => {
  res.sendFile(__dirname + "/pages/cart.html");
});

app.get("/admin/dashboard", AuthMiddleware.verifyToken, (req, res) => {
  console.log(__dirname + "/pages/dashboard.html");
  res.sendFile(__dirname + "/pages/dashboard.html");
});

app.get("/admin/menu", (req, res) => {
  res.sendFile(__dirname + "/pages/menu.html");
});

app.listen(8000);
