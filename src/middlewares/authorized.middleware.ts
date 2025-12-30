import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http-error";
import { JWT_SECRET } from "../config";
import { UserRepository } from "../repositories/user.repositories";
import { IUser } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any> | IUser;
    }
  }
}
// Adding user info to req object

const userRepository = new UserRepository();
export const authorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new HttpError("Unauthorized Token Malformed", 401);
    const token = authHeader.split(" ")[1]; // "Bearer <token>" [1] -> token
    if (!token) throw new HttpError("Unauthorized Token Missing", 401);
    const decoded = jwt.verify(token, JWT_SECRET) as Record<string, any>;
    if (!decoded || !decoded.id)
      throw new HttpError("Unauthorized Token Invalid", 401);

    const user = await userRepository.getUserByID(decoded.id);
    if (!user) throw new HttpError("Unauthorized User Not Found", 401);

    req.user = user; // attach user info to req object
    return next();
  } catch (error: Error | any) {
    return res.status(error.statusCode ?? 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
  // if(req.headers && req.headers.authorization){
  //     return next();
  // }
  // return res.status(401).json({ success: false, message: "Unauthorized" });
};

export const adminOnlyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //req.user is set in authorized iddleware
    // any function after authorizedMiddleware can access req.user
    if (!req.user) {
      throw new HttpError("Unauthorized User Not Found", 401);
    }
    if (req.user.role !== "admin") {
      throw new HttpError("Forbidden Admins Only", 403);
    }
    return next();
  } catch (error: Error | any) {
    return res.status(error.statusCode ?? 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
