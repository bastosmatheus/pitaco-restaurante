import mongoose from "mongoose";
import { Dish } from "../models/Dish";
import { EResponseDish, IDish, IDishRepository } from "../interfaces/IDishRepository";

class DishRepository implements IDishRepository {
  public async getAll(): Promise<IDish[]> {
    const dishes = await Dish.find();

    return dishes;
  }

  public async getById(id: string): Promise<EResponseDish.DishNotFound | IDish> {
    const dish = await Dish.findById(id);

    if (dish === null) {
      return EResponseDish.DishNotFound;
    }

    return dish;
  }

  public async create(
    nameDish: string,
    image: string,
    value: number,
    servesHowManyPeople: number,
    description: string,
    category: string
  ): Promise<EResponseDish.DishExists | IDish> {
    const dishExists = await Dish.findOne({ nameDish });

    if (dishExists) {
      return EResponseDish.DishExists;
    }

    const dish = await Dish.create({
      nameDish,
      image,
      value,
      servesHowManyPeople,
      description,
      category,
    });

    return dish;
  }

  public async update(
    id: string,
    nameDish: string,
    image: string,
    value: number,
    servesHowManyPeople: number,
    description: string,
    category: string
  ): Promise<EResponseDish.DishNotFound | IDish> {
    const dishExists = await Dish.findById(id);

    if (dishExists === null) {
      return EResponseDish.DishNotFound;
    }

    const dish = await Dish.findOneAndUpdate(new mongoose.Types.ObjectId(id), {
      nameDish,
      image,
      value,
      servesHowManyPeople,
      description,
      category,
    });

    if (dish === null) {
      return EResponseDish.DishNotFound;
    }

    return dish;
  }

  public async delete(id: string): Promise<EResponseDish.DishNotFound | IDish> {
    const dish = await Dish.findOneAndDelete(new mongoose.Types.ObjectId(id));

    if (dish === null) {
      return EResponseDish.DishNotFound;
    }

    return dish;
  }

  public async dishExists(nameDish: string): Promise<EResponseDish.DishNotFound | IDish> {
    const dish = await Dish.findOne({ nameDish });

    if (dish === null) {
      return EResponseDish.DishNotFound;
    }

    return dish;
  }
}

export { DishRepository };
