import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { connectDatabase } from "./database/mongodb";
import { PORT } from "./config";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import bookRoutes from "./routes/book.route";
import authUserRoutes from "./routes/admin/user.route";

import dotenv from "dotenv";
dotenv.config();
//can use .env variable below this
console.log(process.env.PORT);

const app: Application = express();
let corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3005"],
  //which doamin can access your backend server
  //add frontend domain in origin
};
//origin : "*", // allow all domain to access your backend server
app.use(cors(corsOptions)); // implement cors middleware
// const PORT: number = 3000;`

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);
app.use("/api/admin/users", authUserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

async function startServer() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
  });
}
startServer();
