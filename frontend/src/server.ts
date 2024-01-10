import express from "express";
import { URL } from "url";

const app = express();
const __dirname = new URL(".", import.meta.url).pathname.slice(1);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/dist"));

app.use("/cart", (req, res) => {
  res.sendFile(__dirname + "/pages/cart.html");
});

app.use("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});

app.use("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/pages/dashboard.html");
});

app.use("/register", (req, res) => {
  res.sendFile(__dirname + "/pages/register.html");
});

app.use("/menu", (req, res) => {
  res.sendFile(__dirname + "/pages/menu.html");
});

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});

app.listen(8000);
