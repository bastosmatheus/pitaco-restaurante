import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ConflictError } from "../errors/ConfilictError";
import { NotFoundError } from "../errors/NotFoundError";
import { UserRepository } from "../repositories/UserRepository";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UnprocessableEntity } from "../errors/UnprocessableEntity";
import { EResponseUser, IUser } from "../interfaces/IUserRepository";
import { Either, failure, success } from "../errors/either";

interface IUserJwt extends IUser {
  id: string;
  isAdmin: boolean;
}

class UserService {
  private readonly userRepository = new UserRepository();

  public async getAll(): Promise<IUser[]> {
    const users = await this.userRepository.getAll();

    return users;
  }

  public async getById(id: string): Promise<Either<UnprocessableEntity | NotFoundError, IUser>> {
    if (!id) {
      return failure(new UnprocessableEntity("O ID é obrigatório"));
    }

    const user = await this.userRepository.getById(id);

    if (user === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário foi encontrado com o ID: " + id));
    }

    return success(user);
  }

  public async create(
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ): Promise<Either<UnprocessableEntity | NotFoundError | ConflictError, IUser>> {
    if (!name || name === "") {
      return failure(new UnprocessableEntity("O campo de nome é obrigatório"));
    }

    if (!lastname || lastname === "") {
      return failure(new UnprocessableEntity("O campo de sobrenome é obrigatório"));
    }

    if (!username || username === "") {
      return failure(new UnprocessableEntity("O campo de nome de usuário é obrigatório"));
    }

    if (!email || email === "") {
      return failure(new UnprocessableEntity("O campo de email é obrigatório"));
    }

    if (!password || password === "") {
      return failure(new UnprocessableEntity("O campo de senha é obrigatório"));
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.userRepository.create(name, lastname, username, email, passwordHash);

    if (user == EResponseUser.UsernameExists) {
      return failure(
        new ConflictError("Não é possível criar esse nome de usuário, pois ele já existe")
      );
    }

    if (user === EResponseUser.EmailExists) {
      return failure(new ConflictError("Não é possível criar esse email, pois ele já existe"));
    }

    return success(user);
  }

  public async update(
    id: string,
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ): Promise<Either<UnprocessableEntity | NotFoundError, IUser>> {
    if (!id) {
      return failure(new UnprocessableEntity("O ID é obrigatório"));
    }

    if (!name || name === "") {
      return failure(new UnprocessableEntity("O campo de nome é obrigatório"));
    }

    if (!lastname || lastname === "") {
      return failure(new UnprocessableEntity("O campo de sobrenome é obrigatório"));
    }

    if (!username || username === "") {
      return failure(new UnprocessableEntity("O campo de nome de usuário é obrigatório"));
    }

    if (!email || email === "") {
      return failure(new UnprocessableEntity("O campo de email é obrigatório"));
    }

    if (!password || password === "") {
      return failure(new UnprocessableEntity("O campo de senha é obrigatório"));
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.userRepository.update(
      id,
      name,
      lastname,
      username,
      email,
      passwordHash
    );

    if (user === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário foi encontrado com o ID: " + id));
    }

    return success(user);
  }

  public async delete(id: string): Promise<Either<UnprocessableEntity | NotFoundError, IUser>> {
    if (!id) {
      return failure(new UnprocessableEntity("O ID é obrigatório"));
    }

    const user = await this.userRepository.delete(id);

    if (user === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário foi encontrado com o ID: " + id));
    }

    return success(user);
  }

  public async loginUser(
    email: string,
    password: string
  ): Promise<Either<UnprocessableEntity | NotFoundError, string>> {
    if (!email || email === "") {
      return failure(new UnprocessableEntity("O campo de email é obrigatório"));
    }

    const user = await this.userRepository.loginUser(email);

    if (user === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Email inválido"));
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return failure(new NotFoundError("Senha inválida"));
    }

    const userJwt = user as IUserJwt;

    const token = jwt.sign(
      { id: userJwt.id, isAdmin: userJwt.isAdmin },
      process.env.JWT_PASS ?? "",
      {
        expiresIn: "30d",
      }
    );

    return success(token);
  }

  public async addDishesInCart(
    token: string,
    nameDish: string,
    image: string,
    valueTotal: number,
    quantityOfOrder: number
  ): Promise<Either<UnprocessableEntity | UnauthorizedError | NotFoundError, IUser>> {
    if (!token || token === "" || token === "null") {
      return failure(new UnauthorizedError("Token inválido"));
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_PASS || "", (err, decoded) => {
      if (err) {
        return failure(new UnauthorizedError("Token inválido"));
      }

      return decoded;
    });

    if (!nameDish || nameDish === "") {
      return failure(new UnprocessableEntity("O nome do prato é obrigatório"));
    }

    if (!valueTotal) {
      return failure(new UnprocessableEntity("A imagem é obrigatória"));
    }

    if (!image || image === "") {
      return failure(new UnprocessableEntity("O valor total é obrigatório"));
    }

    if (!quantityOfOrder) {
      return failure(new UnprocessableEntity("A quantidade do pedido é obrigatória"));
    }

    const dish = await this.userRepository.addDishesInCart(
      verifiedToken.id,
      nameDish,
      image,
      valueTotal,
      quantityOfOrder
    );

    if (dish === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário encontrado com o ID: " + verifiedToken.id));
    }

    return success(dish);
  }

  public async getDishesInCart(
    token: string
  ): Promise<Either<UnprocessableEntity | NotFoundError, IUser>> {
    if (!token || token === "" || token === "null") {
      return failure(new UnauthorizedError("Token inválido"));
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_PASS || "", (err, decoded) => {
      if (err) {
        return failure(new UnauthorizedError("Token inválido"));
      }

      return decoded;
    });

    const user = await this.userRepository.getById(verifiedToken.id);

    if (user === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário encontrado com o ID: " + verifiedToken.id));
    }

    return success(user);
  }
}

export { UserService };
