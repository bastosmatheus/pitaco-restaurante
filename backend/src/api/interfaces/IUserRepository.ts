enum EResponseUser {
  UsernameExists,
  EmailExists,
  UserNotFound,
}

type Dish = {
  nameDish?: string;
  image?: string;
  valueTotal?: number;
  quantityOfOrder?: number;
};

interface IUser {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  cart: {
    dishes: Dish[];
  };
}

interface IUserRepository {
  getAll(): Promise<IUser[]>;
  getById(id: string): Promise<EResponseUser.UserNotFound | IUser>;
  create(
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ): Promise<EResponseUser.UsernameExists | EResponseUser.EmailExists | IUser>;
  update(
    id: string,
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ): Promise<EResponseUser.UserNotFound | IUser>;
  delete(id: string): Promise<EResponseUser.UserNotFound | IUser>;
  loginUser(email: string): Promise<EResponseUser.UserNotFound | IUser>;
  addDishesInCart(
    id: string,
    nameDish: string,
    image: string,
    valueTotal: number,
    quantityOfOrder: number
  ): Promise<EResponseUser.UserNotFound | IUser>;
}

export { IUserRepository, IUser, EResponseUser };
