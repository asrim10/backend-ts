import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repositories";
import bcryptjs from "bcryptjs";
import { HttpError } from "../errors/http-error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

let userRepository = new UserRepository();

export class UserService {
  async createUser(data: CreateUserDTO) {
    // business logic before creating user
    const emailCheck = await userRepository.getUserByEmail(data.email);
    if (emailCheck) {
      throw new HttpError("Email already in use", 403);
    }
    const usernameCheck = await userRepository.getUserByUsername(data.username);
    if (usernameCheck) {
      throw new HttpError("Username already in use", 403);
    }
    // hash password
    const hashedPassword = await bcryptjs.hash(data.password, 10); // 10 - complexity
    data.password = hashedPassword;

    // create user
    const newUser = await userRepository.createUser(data);
    return newUser;
  }

  async loginUser(data: LoginUserDTO) {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    // compare password
    const validPassword = await bcryptjs.compare(data.password, user.password);
    // plaintext, hashed
    if (!validPassword) {
      throw new HttpError("Invalid credentials", 404);
    }
    // generate jwt
    const payload = {
      // user identifier
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" }); // 30 days
    return { token, user };
  }

  async getUserById(id: string) {
    const user = await userRepository.getUserByID(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return user;
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    const user = await userRepository.getUserByID(id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    if (user.email != data.email) {
      const emailCheck = await userRepository.getUserByEmail(data.email!);
      if (emailCheck) {
        throw new HttpError("Email already in use", 403);
      }
    }
    if (user.username !== data.username) {
      const usernameCheck = await userRepository.getUserByUsername(
        data.username!,
      );
      if (usernameCheck) {
        throw new HttpError("Username already in use", 403);
      }
    }
    if (data.password) {
      const hashedPassword = await bcryptjs.hash(data.password, 10);
      data.password = hashedPassword;
    }
    const updatedUser = await userRepository.updateUser(id, data);
    return updatedUser;
  }
}
