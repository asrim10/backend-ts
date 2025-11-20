import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/book.route";

const app: Application = express();
const PORT: number = 3000;

app.use(bodyParser.json());

app.get("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running at : http://localhost:${PORT}`);
});
