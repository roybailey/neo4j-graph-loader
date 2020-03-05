import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";

// Controllers (route handlers)
import apiRouter from "./controllers/api";
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => res.send("Hello World!"));

// API examples routes
app.use("/api", apiRouter);

export default app;
