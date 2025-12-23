import { CreateUserDTO } from "../dtos/user.dto";
import { HttpError } from "../errors/http-error";
import { UserRepository } from "../repositories/user.repositories";
import bcryptjs from "bcryptjs";
let userRepositoory = new UserRepository();

export class UserService {
  async createUser(data: CreateUserDTO) {
    //business logic before creating user
    const emailCheck = await userRepositoory.getUserByEmail(data.email);
    if (emailCheck) {
      throw new HttpError("Email already in use", 403);
    }
    const usernameCheck = await userRepositoory.getUserByUsername(
      data.username
    );
    if (usernameCheck) {
      throw new HttpError("Username already in use", 403);
    }
    //hash password
    const hashedPassword = await bcryptjs.hash(data.password, 10); //10 complexity
    data.password = hashedPassword;

    //create user
    const newUser = await userRepositoory.createUser(data);
    return newUser;
  }
}
