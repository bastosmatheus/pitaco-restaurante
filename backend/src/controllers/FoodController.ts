// import { Aggregate } from "mongoose";
import { DishType } from "../@types";
import { Food } from "../models/Food";
import { Request, Response } from "express";

class FoodController {
  public async getAllDishs(_req: Request, res: Response): Promise<Response> {
    const dishs = await Food.find();

    return res.status(200).send(dishs);
  }

  public async getDishById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const dish = await Food.findById(id);

    if (!dish) {
      return res.status(400).send("can't find dish id.");
    }

    return res.status(200).send(dish);
  }

  public async createDish(req: Request, res: Response): Promise<Response> {
    const { nameDish, image, value, ingredients, servesHowManyPeople, description } =
      req.body as DishType;

    const newDish = {
      nameDish: nameDish,
      image: image,
      value: value,
      ingredients: ingredients,
      servesHowManyPeople: servesHowManyPeople,
      description: description,
    };

    const dish = await Food.create(newDish);

    if (!dish) {
      return res.status(400).send({ message: "dish creation is not possible." });
    }

    return res.status(201).send("dish created with successful.");
  }

  public async deleteDish(req: Request, res: Response): Promise<Response | undefined> {
    const id = req.params.id as string;

    const dish = await Food.findByIdAndDelete(id);

    if (!dish) {
      return res.status(404).send({ message: "id of dish not found." });
    }

    return res.status(200).send("dish deleted successfully.");
  }

  public async updateDish(req: Request, res: Response): Promise<Response | undefined> {
    const { nameDish, image, value, ingredients, servesHowManyPeople, description } =
      req.body as DishType;

    const id = req.params.id;

    const newDish = {
      nameDish: nameDish,
      image: image,
      value: value,
      ingredients: ingredients,
      servesHowManyPeople: servesHowManyPeople,
      description: description,
    };

    const updatedDish = await Food.findByIdAndUpdate(id, newDish);

    if (!updatedDish) {
      return res.status(400).send({ message: "not possible update dish." });
    }

    return res.status(200).send("dish updated successfully.");
  }
}

export default new FoodController();
