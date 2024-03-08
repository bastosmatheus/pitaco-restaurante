import mongoose from "mongoose";

class Database {
  public async connect() {
    const mongoUser = process.env.MONGODB_USER;
    const mongoPassword = process.env.MONGODB_PASSWORD;

    await mongoose
      .connect(
        `mongodb+srv://${mongoUser}:${mongoPassword}@pitaco-restaurante.yr3sqwh.mongodb.net/`
      )
      .then(() => console.log("connected on mongodb"));
  }
}

export { Database };
