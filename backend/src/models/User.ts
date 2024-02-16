import mongoose from "mongoose";
import { CartSchema } from "./Cart";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  cart: { type: CartSchema, default: {} },
});

const User = mongoose.model("users", UserSchema);

export { User, UserSchema };
