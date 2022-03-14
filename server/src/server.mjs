import express from "express";
import bodyParser from "body-parser";
import { AppRouter } from "./routes.mjs";

const port = 3001;

const app = express();

app.listen(port);

app.use(bodyParser.json());

app.use("/api", AppRouter);
