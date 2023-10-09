import mongoose from "mongoose";
import { DishType } from "../@types";

const FoodSchema = new mongoose.Schema<DishType>({
  nameDish: { type: String, required: true },
  image: { type: String, required: true },
  value: { type: Number, required: true },
  ingredients: { type: [String], required: true, default: [] },
  servesHowManyPeople: { type: Number, required: true },
  description: { type: String, required: true },
});

const Food = mongoose.model("Foods", FoodSchema);

export { Food };
