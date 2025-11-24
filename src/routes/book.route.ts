import { Router, Request, Response } from "express";
import { BookController } from "../controllers/book.controller";

const bookController = new BookController();
const router: Router = Router();
router.get("/", bookController.getBooks);

//make a router that handles GET request that takes bookid
// /:ookid and calls bookController.getBookByID

// router.get('/:bookid', bookController.)

export default router;
