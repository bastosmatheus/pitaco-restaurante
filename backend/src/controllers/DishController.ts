import { Dish } from "../models/Dish";
import { Request, Response } from "express";

class DishController {
  public async getAllDishes(_req: Request, res: Response): Promise<Response> {
    const dishes = await Dish.find();

    return res.status(200).json({ type: "OK", statusCode: 200, dishes: dishes });
  }

  public async getDishById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id || id === "") {
      return res.status(422).json({
        message: "O ID é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    const dish = await Dish.findById(id);

    if (!dish) {
      return res.status(404).send({
        message: `Não existe nenhum prato com o ID ${id}`,
        type: "Not Found",
        statusCode: 404,
      });
    }

    return res.status(200).json({ type: "OK", statusCode: 200, dish: dish });
  }

  public async createDish(req: Request, res: Response): Promise<Response> {
    const { nameDish, image, value, servesHowManyPeople, description, category } = req.body;

    if (!nameDish || nameDish === "") {
      return res.status(422).json({
        message: "O campo de nome é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!image || image === "") {
      return res.status(422).json({
        message: "O campo de imagem é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!value || value === "") {
      return res.status(422).json({
        message: "O campo de valor é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!servesHowManyPeople || servesHowManyPeople === "") {
      return res.status(422).json({
        message: "O campo de quantas pessoas o prato serve é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!description || description === "") {
      return res.status(422).json({
        message: "O campo de descrição é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!category || category === "") {
      return res.status(422).json({
        message: "O campo de categoria é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    const dishExists = await Dish.findOne({ nameDish: nameDish });

    if (dishExists) {
      return res
        .status(409)
        .json({ message: "Esse prato já existe no cardápio", type: "Conflict", statusCode: 409 });
    }

    const newDish = {
      nameDish: nameDish,
      image: image,
      value: value,
      servesHowManyPeople: servesHowManyPeople,
      description: description,
      category: category,
    };

    const dish = await Dish.create(newDish);

    if (!dish) {
      return res.status(400).json({
        message: "Não foi possível criar o prato",
        type: "Bad Request",
        statusCode: 400,
      });
    }

    return res.status(201).json({
      message: "O prato foi criado com sucesso",
      type: "Created",
      statusCode: 201,
      dish: dish,
    });
  }

  public async deleteDish(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id || id === "") {
      return res.status(422).json({
        message: "O ID é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    const dish = await Dish.findByIdAndDelete(id);

    if (!dish) {
      return res.status(404).send({
        message: `Não existe nenhum prato com o ID ${id}`,
        type: "Not Found",
        statusCode: 404,
      });
    }

    return res.status(200).json({
      message: "O prato foi deletado com sucesso",
      type: "OK",
      statusCode: 200,
      dish: dish,
    });
  }

  public async updateDish(req: Request, res: Response): Promise<Response> {
    const { nameDish, image, value, servesHowManyPeople, description, category } = req.body;

    const { id } = req.params;

    if (!id || id === "") {
      return res.status(422).json({
        message: "O ID é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!nameDish || nameDish === "") {
      return res.status(422).json({
        message: "O campo de nome é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!image || image === "") {
      return res.status(422).json({
        message: "O campo de imagem é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!value || value === "") {
      return res.status(422).json({
        message: "O campo de valor é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!servesHowManyPeople || servesHowManyPeople === "") {
      return res.status(422).json({
        message: "O campo de quantas pessoas o prato serve é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!description || description === "") {
      return res.status(422).json({
        message: "O campo de descrição é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    if (!category || category === "") {
      return res.status(422).json({
        message: "O campo de categoria é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    const newDish = {
      nameDish: nameDish,
      image: image,
      value: value,
      servesHowManyPeople: servesHowManyPeople,
      description: description,
      category: category,
    };

    const dish = await Dish.findByIdAndUpdate(id, newDish);

    if (!dish) {
      return res.status(404).send({
        message: `Não existe nenhum prato com o ID ${id}`,
        type: "Not Found",
        statusCode: 404,
      });
    }

    return res.status(200).json({
      message: "O prato foi atualizado com sucesso",
      type: "OK",
      statusCode: 200,
      dish: dish,
    });
  }

  public async dishExists(req: Request, res: Response): Promise<Response> {
    const { nameDish } = req.body;

    if (!nameDish || nameDish === "") {
      return res.status(422).json({
        message: "O campo de nome é obrigatório",
        type: "Unprocessable Entity",
        statusCode: 422,
      });
    }

    const dish = await Dish.findOne({ nameDish: nameDish });

    if (!dish) {
      return res
        .status(404)
        .json({ message: "Esse prato não existe no cardápio", type: "Not Found", statusCode: 404 });
    }

    return res.status(200).json({
      message: `O prato ${nameDish} existe no cardápio`,
      type: "OK",
      statusCode: 200,
      dish: dish,
    });
  }
}

export default new DishController();
