import { Router } from "express";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { BlogController } from "../controllers/blog.controller";

const blogRouter = Router();
const blogController = new BlogController();

blogRouter.post("/", authorizedMiddleware, blogController.createBlog);
blogRouter.get("/", blogController.getAllBlogs);

export default blogRouter;
