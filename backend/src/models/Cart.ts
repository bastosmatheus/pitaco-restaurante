import mongoose from "mongoose";
import { FoodSchema } from "./Food";

const CartSchema = new mongoose.Schema({
  dishes: [FoodSchema],
});

const Cart = mongoose.model("Carts", CartSchema);

export { Cart, CartSchema };
