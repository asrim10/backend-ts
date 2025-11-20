import { Request, Response } from "express";

export class BookController {
  getBooks = (req: Request, res: Response) => {
    const books = [
      {
        id: "B-1",
        title: "1999",
      },
      {
        id: "B-2",
        title: "To Kill a Mockingbird",
        date: "2015-12-10",
      },
    ];
    res.status(200).json(books);
  };
}
