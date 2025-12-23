import { CreateUserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repositories";
import bcryptjs from "bcryptjs";
let userRepositoory = new UserRepository();

export class UserService {
  async createUser(data: CreateUserDTO) {
    //business logic before creating user
    const emailCheck = await userRepositoory.getUserByEmail(data.email);
    if (emailCheck) {
      throw new Error("Email already in use");
    }
    const usernameCheck = await userRepositoory.getUserByUsername(
      data.username
    );
    if (usernameCheck) {
      throw new Error("Username already in use");
    }
    //hash password
    const hashedPassword = await bcryptjs.hash(data.password, 10); //10 complexity
    data.password = hashedPassword;

    //create user
    const newUser = await userRepositoory.createUser(data);
    return newUser;
  }
}
