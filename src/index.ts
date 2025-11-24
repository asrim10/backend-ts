import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/book.route";

const app: Application = express();
const PORT: number = 3000;

app.use(bodyParser.json());
app.use("/api/books", bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
