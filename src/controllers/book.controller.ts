import { Request, Response } from "express";

export type Book = {
  id: string;
  title: string;
  date?: string;
}

export const book: Book[] = [
  {
        id: "B-1",
        title: "1999",
      },
      {
        id: "B-2",
        title: "To Kill a Mockingbird",
        date: "2015-12-10",
      }
]

export class BookController {
  createBook = (req: Request, res: Response) => {
    const { id, title } = req.body // destructing
    // const id: string = req.body.id;

    if (!id) {
      return res.status(400).json({ message: "BookID is required" });
    }
    if (!title) {
      return res.status(400).json({ message: "Book Title is required" });
    }
    const checkBook = book.find(elem => elem.id == id);    
    if (!checkBook) {
      return res.status(400).json({ message: "Book ID already exists" });
    }
    const newBook: Book = { id, title };
    // same as {id: id, title: title}, if key and variable name are same
    book.push(newBook);
    return res.status(201).json(newBook);

  }

  getBooks = (req: Request, res: Response) => {
    const return_book: Book[] = book;
    res.status(200).json(book);
  };
}
