import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  nameDish: { type: String, required: true },
  image: { type: String, required: true },
  value: { type: Number, required: true },
  servesHowManyPeople: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: false },
});

const Food = mongoose.model("Foods", FoodSchema);

export { Food };
