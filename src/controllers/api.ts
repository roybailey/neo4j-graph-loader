"use strict";

import logger from "../util/logger";

import {neo4jNode2Cypher} from "../graph/neo4j-converter";
import {clearGraph, countGraph, NOHANDLER, runCypher} from "../graph/neo4j-util";

import express from "express";

const router = express.Router();


/* GET ALL API */
router.get("/", function (req, res, next) {
    res.json({
        "routes": [
            {"path": "/json2cypher"},
            {"path": "/csv2json"},
            {"path": "/csv2cypher"}
        ]
    });
});

/* CONVERT JSON2CYPHER */
router.post("/json2cypher", function (req, res, next) {
    logger.debug(req.body);
    res.setHeader("Content-Type", "text/plain");
    res.send(neo4jNode2Cypher(req.body));
});

/* CONVERT CSV2JSON */
router.post("/csv2json", function (req, res, next) {
    logger.debug(req.body);
    res.json({"example": "csv2json"});
});

/* CONVERT CSV2CYPHER */
router.post("/csv2cypher", function (req, res, next) {
    logger.debug(req.body);
    res.send("create (csv2cypher)");
});

/* CONVERT JSON2CYPHER */
router.post("/cypher2neo4j", function (req, res, next) {
    logger.debug("cypher2neo4j\n"+req.body.toString());
    countGraph()
        .then(() => clearGraph())
        .then(() => countGraph())
        .then(() => runCypher(req.body, {}, NOHANDLER))
        .then(() => {
            const count = countGraph();
            res.status(200);
            res.setHeader("Content-Type", "text/plain");
            res.send(count);
        })
        .catch((err: any) => {
            logger.error(err);
            res.status(400);
            res.setHeader("Content-Type", "text/plain");
            res.send(err.toString());
        });
});

export default router;
