import { UserRepository } from "../../repositories/user.repositories";
import bcryptjs from "bcryptjs";
import { CreateUserDTO } from "../../dtos/user.dto";
import { HttpError } from "../../errors/http-error";

let userRepository = new UserRepository();

export class AdminUserService {
  async createUser(data: CreateUserDTO) {
    //same as src/services/user.service.ts
    //business logic before creating user
    const emailCheck = await userRepository.getUserByEmail(data.email);
    if (emailCheck) {
      throw new HttpError("Email already in use", 403);
    }
    const usernameCheck = await userRepository.getUserByUsername(data.username);
    if (usernameCheck) {
      throw new HttpError("Username already in use", 403);
    }
    //hash password
    const hashedPassword = await bcryptjs.hash(data.password, 10); //10 complexity
    data.password = hashedPassword;

    //create user
    const newUser = await userRepository.createUser(data);
    return newUser;
  }

  async getAllUsers() {
    const users = await userRepository.getAllUsers();
    //tranformation of filtering logic can be added here
    return users;
  }
  async getOneUser(id: string) {
    const user = await userRepository.getUserByID(id);
    console.log(user);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return user;
  }
  //continue all
}
