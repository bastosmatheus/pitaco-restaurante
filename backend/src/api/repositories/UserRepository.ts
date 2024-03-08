import mongoose from "mongoose";
import { User } from "../models/User";
import { EResponseUser, IUser, IUserRepository } from "../interfaces/IUserRepository";

class UserRepository implements IUserRepository {
  public async getAll(): Promise<IUser[]> {
    const users = await User.find();

    return users;
  }

  public async getById(id: string): Promise<EResponseUser.UserNotFound | IUser> {
    const user = await User.findById(id);

    if (user === null) {
      return EResponseUser.UserNotFound;
    }

    return user;
  }

  public async create(
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ): Promise<EResponseUser.UsernameExists | EResponseUser.EmailExists | IUser> {
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return EResponseUser.UsernameExists;
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return EResponseUser.EmailExists;
    }

    const user = await User.create({
      name,
      lastname,
      username,
      email,
      password,
    });

    return user;
  }

  public async update(
    id: string,
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ): Promise<EResponseUser.UserNotFound | IUser> {
    const userExists = await User.findById(id);

    if (userExists === null) {
      return EResponseUser.UserNotFound;
    }

    const user = await User.findOneAndUpdate(new mongoose.Types.ObjectId(id), {
      name,
      lastname,
      username,
      email,
      password,
    });

    if (user === null) {
      return EResponseUser.UserNotFound;
    }

    return user;
  }

  public async delete(id: string): Promise<EResponseUser.UserNotFound | IUser> {
    const user = await User.findOneAndDelete(new mongoose.Types.ObjectId(id));

    if (user === null) {
      return EResponseUser.UserNotFound;
    }

    return user;
  }

  public async loginUser(email: string): Promise<EResponseUser.UserNotFound | IUser> {
    const user = await User.findOne({ email });

    if (user === null) {
      return EResponseUser.UserNotFound;
    }

    return user;
  }

  public async addDishesInCart(
    id: string,
    nameDish: string,
    image: string,
    valueTotal: number,
    quantityOfOrder: number
  ): Promise<EResponseUser.UserNotFound | IUser> {
    const user = await this.getById(id);

    if (user === EResponseUser.UserNotFound) {
      return EResponseUser.UserNotFound;
    }

    const dishes = user.cart.dishes;

    const existsDish = dishes.find((dish) => dish.nameDish === nameDish);

    if (existsDish !== undefined) {
      existsDish.image = image;
      existsDish.quantityOfOrder = quantityOfOrder;
      existsDish.valueTotal = valueTotal;
    } else {
      dishes.push({
        nameDish,
        image,
        valueTotal,
        quantityOfOrder,
      });
    }

    const cartUpdated = (await User.findByIdAndUpdate({ _id: id }, { cart: { dishes } })) as IUser;

    return cartUpdated;
  }
}

export { UserRepository };
