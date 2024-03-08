import { Request, Response } from "express";
import { DishService } from "../services/DishService";

class DishController {
  public async getAllDishes(req: Request, res: Response): Promise<Response> {
    const dishService = new DishService();

    const dishes = await dishService.getAll();

    return res.status(200).json({ type: "OK", statusCode: 200, dishes });
  }

  public async getDishById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const dishService = new DishService();

    const dish = await dishService.getById(id);

    if (dish.isFailure()) {
      return res.status(dish.value.statusCode).json(dish.value);
    }

    return res.status(200).json({ type: "OK", statusCode: 200, dish: dish.value });
  }

  public async createDish(req: Request, res: Response): Promise<Response> {
    const { nameDish, image, value, servesHowManyPeople, description, category } = req.body;

    const dishService = new DishService();

    const dish = await dishService.create(
      nameDish,
      image,
      value,
      servesHowManyPeople,
      description,
      category
    );

    if (dish.isFailure()) {
      return res.status(dish.value.statusCode).json(dish.value);
    }

    return res.status(201).json({
      message: "O prato foi criado com sucesso",
      type: "Created",
      statusCode: 201,
      dish: dish.value,
    });
  }

  public async updateDish(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { nameDish, image, value, servesHowManyPeople, description, category } = req.body;

    const dishService = new DishService();

    const dish = await dishService.update(
      id,
      nameDish,
      image,
      value,
      servesHowManyPeople,
      description,
      category
    );

    if (dish.isFailure()) {
      return res.status(dish.value.statusCode).json(dish.value);
    }

    return res.status(200).json({
      message: "O prato foi atualizado com sucesso",
      type: "OK",
      statusCode: 200,
      dish: dish.value,
    });
  }

  public async deleteDish(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const dishService = new DishService();

    const dish = await dishService.delete(id);

    if (dish.isFailure()) {
      return res.status(dish.value.statusCode).json(dish.value);
    }

    return res.status(200).json({
      message: "O prato foi deletado com sucesso",
      type: "OK",
      statusCode: 200,
      dish: dish.value,
    });
  }

  public async dishExists(req: Request, res: Response): Promise<Response> {
    const { nameDish } = req.body;

    const dishService = new DishService();

    const dish = await dishService.dishExists(nameDish);

    if (dish.isFailure()) {
      return res.status(dish.value.statusCode).json(dish.value);
    }

    return res.status(200).json({
      message: `O prato ${nameDish} existe no cardápio`,
      type: "OK",
      statusCode: 200,
      dish: dish.value,
    });
  }
}

export default new DishController();
