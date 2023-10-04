import mongoose from "mongoose";

const mongoUser = process.env.MONGODB_USER;
const mongoPassword = process.env.MONGODB_PASSWORD;

export async function connection(): Promise<void> {
  mongoose
    .connect(`mongodb+srv://${mongoUser}:${mongoPassword}@pitaco-restaurante.yr3sqwh.mongodb.net/`)
    .then(() => console.log("connected on mongodb"));
}
