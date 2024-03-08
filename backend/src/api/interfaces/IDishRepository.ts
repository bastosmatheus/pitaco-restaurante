enum EResponseDish {
  DishExists,
  DishNotFound,
}

interface IDish {
  nameDish: string;
  image: string;
  value: number;
  servesHowManyPeople: number;
  description: string;
  category: string;
}

interface IDishRepository {
  getAll(): Promise<IDish[]>;
  getById(id: string): Promise<EResponseDish.DishNotFound | IDish>;
  create(
    nameDish: string,
    image: string,
    value: number,
    servesHowManyPeople: number,
    description: string,
    category: string
  ): Promise<EResponseDish.DishExists | IDish>;
  update(
    id: string,
    nameDish: string,
    image: string,
    value: number,
    servesHowManyPeople: number,
    description: string,
    category: string
  ): Promise<EResponseDish.DishNotFound | IDish>;
  delete(id: string): Promise<EResponseDish.DishNotFound | IDish>;
  dishExists(nameDish: string): Promise<EResponseDish.DishNotFound | IDish>;
}

export { IDishRepository, IDish, EResponseDish };
