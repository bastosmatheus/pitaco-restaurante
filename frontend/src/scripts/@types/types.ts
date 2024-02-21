export type Dish = {
  _id: string;
  nameDish: string;
  image: string;
  value: number;
  servesHowManyPeople: number;
  description: string;
  category: string;
};

export type ResponseDishes = {
  type: string;
  statusCode: number;
  dishes: Dish[];
};

export type ResponseDish = {
  message: string;
  type: string;
  statusCode: number;
  dish: Dish;
};

export type ResponseCart = {
  type: string;
  statusCode: number;
  cart: { dishes: CartDish[] };
};

export type CartDish = {
  nameDish: string;
  image: string;
  valueTotal: number;
  quantityOfOrder: number;
};

export type ResponseDefault = {
  message: string;
  type: string;
  statusCode: number;
};

export type ReponseToken = {
  message: string;
  type: string;
  statusCode: number;
  token: string;
};
