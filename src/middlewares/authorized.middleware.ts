import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http-error";
import { JWT_SECRET } from "../config";
import { UserRepository } from "../repositories/user.repositories";

const userRepository = new UserRepository();

export const authorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers && req.headers.authorization) {
    return next();
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};
