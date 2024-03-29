import express from "express";
import { URL } from "url";
import dotenv from "dotenv";
import AuthMiddleware from "./scripts/middlewares/AuthMiddleware";
import CartMiddleware from "./scripts/middlewares/CartMiddleware";

const app = express();
const __dirname = new URL(".", import.meta.url).pathname.slice(1);

dotenv.config();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/dist"));

app.get("/loginexpired", (req, res) => {
  res.sendFile(__dirname + "/pages/loginexpired.html");
});

app.get("/loggedout", (req, res) => {
  res.sendFile(__dirname + "/pages/loggedout.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/pages/register.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});

app.get("/cart/:token", CartMiddleware.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/pages/cart.html");
});

app.get("/admin/dashboard/:token", AuthMiddleware.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/pages/dashboard.html");
});

app.get("/admin/menu/:token", AuthMiddleware.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/pages/menu.html");
});

app.get("/admin/menu/adddish/:token", AuthMiddleware.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/pages/adddish.html");
});

app.get("/admin/menu/editdish/:token", AuthMiddleware.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/pages/editdish.html");
});

app.get("/admin/menu/removedish/:token", AuthMiddleware.verifyToken, (req, res) => {
  res.sendFile(__dirname + "/pages/removedish.html");
});

app.listen(8000);
