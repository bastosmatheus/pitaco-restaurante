type DishType = {
  nameDish: string;
  image: string;
  value: number;
  ingredients: string[];
  servesHowManyPeople: number;
  description: string;
};

type OrdersDishType = Pick<DishType, "nameDish" | "value">;

export { DishType, OrdersDishType };
