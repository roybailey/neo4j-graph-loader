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
// parse text/plain
app.use(bodyParser.text());

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => res.send("Hello World!  from neo4j-graph-loader v0.1.1"));

// API examples routes
app.use("/api", apiRouter);

export default app;
