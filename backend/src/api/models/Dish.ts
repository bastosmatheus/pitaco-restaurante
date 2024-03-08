import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  nameDish: { type: String, required: true },
  image: { type: String, required: true },
  value: { type: Number, required: true },
  servesHowManyPeople: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const Dish = mongoose.model("Dishes", DishSchema);

export { Dish, DishSchema };
