export type FoodType = {
  nameDish: string;
  image: string;
  value: number;
  ingredients: string[];
  servesHowManyPeople: number;
  description: string;
};

export type OrdersFoodType = Pick<FoodType, "nameDish" | "value">;
