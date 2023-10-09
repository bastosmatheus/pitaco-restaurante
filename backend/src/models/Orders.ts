import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  orders: [
    {
      nameDish: String,
      value: Number,
    },
  ],
});

const Orders = mongoose.model("Orders", OrdersSchema);

export { Orders };
