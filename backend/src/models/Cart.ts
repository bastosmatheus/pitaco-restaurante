import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  dishes: [{ nameDish: String, image: String, valueTotal: Number, quantityOfOrder: Number }],
});

export { CartSchema };
