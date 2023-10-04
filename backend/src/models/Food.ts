import mongoose from "mongoose";
import { FoodType } from "../@types";

const FoodResgistration = new mongoose.Schema<FoodType>({
  nameDish: { type: String, required: true },
  image: { type: String, required: true },
  value: { type: Number, required: true },
  ingredients: { type: [String], required: true, default: [] },
  servesHowManyPeople: { type: Number, required: true },
  description: { type: String, required: true },
});

export const Food = mongoose.model("Foods", FoodResgistration);
