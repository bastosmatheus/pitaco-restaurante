import { ConflictError } from "../errors/ConfilictError";
import { NotFoundError } from "../errors/NotFoundError";
import { DishRepository } from "../repositories/DishRepository";
import { UnprocessableEntity } from "../errors/UnprocessableEntity";
import { EResponseDish, IDish } from "../interfaces/IDishRepository";
import { Either, failure, success } from "../errors/either";

class DishService {
  private readonly dishRepository = new DishRepository();

  public async getAll(): Promise<IDish[]> {
    const dishes = await this.dishRepository.getAll();

    return dishes;
  }

  public async getById(id: string): Promise<Either<UnprocessableEntity | NotFoundError, IDish>> {
    if (!id) {
      return failure(new UnprocessableEntity("O ID é obrigatório"));
    }

    const dish = await this.dishRepository.getById(id);

    if (dish === EResponseDish.DishNotFound) {
      return failure(new NotFoundError("Nenhum prato foi encontrado com o ID: " + id));
    }

    return success(dish);
  }

  public async create(
    nameDish: string,
    image: string,
    value: number,
    servesHowManyPeople: number,
    description: string,
    category: string
  ): Promise<Either<UnprocessableEntity | NotFoundError | ConflictError, IDish>> {
    if (!nameDish || nameDish === "") {
      return failure(new UnprocessableEntity("O campo de nome é obrigatório"));
    }

    if (!image || image === "") {
      return failure(new UnprocessableEntity("O campo de imagem é obrigatório"));
    }

    if (!value) {
      return failure(new UnprocessableEntity("O campo de valor é obrigatório"));
    }

    if (!servesHowManyPeople) {
      return failure(
        new UnprocessableEntity("O campo de quantas pessoas o prato serve é obrigatório")
      );
    }

    if (!description || description === "") {
      return failure(new UnprocessableEntity("O campo de descrição é obrigatório"));
    }

    if (!category || category === "") {
      return failure(new UnprocessableEntity("O campo de categoria é obrigatório"));
    }

    const dish = await this.dishRepository.create(
      nameDish,
      image,
      value,
      servesHowManyPeople,
      description,
      category
    );

    if (dish == EResponseDish.DishExists) {
      return failure(new ConflictError("Esse prato já existe no cardápio"));
    }

    return success(dish);
  }

  public async update(
    id: string,
    nameDish: string,
    image: string,
    value: number,
    servesHowManyPeople: number,
    description: string,
    category: string
  ): Promise<Either<UnprocessableEntity | NotFoundError, IDish>> {
    if (!id) {
      return failure(new UnprocessableEntity("O ID é obrigatório"));
    }

    if (!nameDish || nameDish === "") {
      return failure(new UnprocessableEntity("O campo de nome é obrigatório"));
    }

    if (!image || image === "") {
      return failure(new UnprocessableEntity("O campo de imagem é obrigatório"));
    }

    if (!value) {
      return failure(new UnprocessableEntity("O campo de valor é obrigatório"));
    }

    if (!servesHowManyPeople) {
      return failure(
        new UnprocessableEntity("O campo de quantas pessoas o prato serve é obrigatório")
      );
    }

    if (!description || description === "") {
      return failure(new UnprocessableEntity("O campo de descrição é obrigatório"));
    }

    if (!category || category === "") {
      return failure(new UnprocessableEntity("O campo de categoria é obrigatório"));
    }

    const dish = await this.dishRepository.update(
      id,
      nameDish,
      image,
      value,
      servesHowManyPeople,
      description,
      category
    );

    if (dish === EResponseDish.DishNotFound) {
      return failure(new NotFoundError("Nenhum prato foi encontrado com o ID: " + id));
    }

    return success(dish);
  }

  public async delete(id: string): Promise<Either<UnprocessableEntity | NotFoundError, IDish>> {
    if (!id) {
      return failure(new UnprocessableEntity("O ID é obrigatório"));
    }

    const dish = await this.dishRepository.delete(id);

    if (dish === EResponseDish.DishNotFound) {
      return failure(new NotFoundError("Nenhum prato foi encontrado com o ID: " + id));
    }

    return success(dish);
  }

  public async dishExists(
    nameDish: string
  ): Promise<Either<UnprocessableEntity | NotFoundError, IDish>> {
    if (!nameDish || nameDish === "") {
      return failure(new UnprocessableEntity("O campo de nome é obrigatório"));
    }

    const dish = await this.dishRepository.dishExists(nameDish);

    if (dish === EResponseDish.DishNotFound) {
      return failure(new NotFoundError("Esse prato não existe no cardápio"));
    }

    return success(dish);
  }
}

export { DishService };
