"use strict";

import logger from "../util/logger";

import express from "express";

import {neo4jCsv2Cypher, neo4jCsv2Record, neo4jNode2Cypher} from "../graph/neo4j-converter";
import {clearGraph, countGraph, NOHANDLER, runCypher} from "../graph/neo4j-util";

const router = express.Router();

/* GET ALL API */
router.get("/", function (req, res, next) {
    res.json({
        "routes": [
            {"path": "/json2cypher"},
            {"path": "/csv2records"},
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
router.post("/csv2records", function (req, res, next) {
    logger.debug(req.body);
    res.json(neo4jCsv2Record(req.body));
});

/* CONVERT CSV2CYPHER */
router.post("/csv2cypher", function (req, res, next) {
    logger.debug(req.body);
    const cypher = neo4jCsv2Cypher(req.body);
    res.setHeader("Content-Type", "text/plain");
    res.send(cypher);
});

/* CONVERT CYPHER2NEO4J */
router.post("/cypher2neo4j", async function (req, res, next) {
    logger.debug("cypher2neo4j\n" + req.body);

    return countGraph()
        .then(() => clearGraph())
        .then(() => countGraph())
        .then(() => runCypher(req.body, {}, NOHANDLER))
        .then(() => countGraph())
        .then(count => {
            res.status(200);
            res.setHeader("Content-Type", "text/plain");
            res.send(`${count}`);
        })
        .catch((err: any) => {
            logger.error(err);
            res.status(400);
            res.setHeader("Content-Type", "text/plain");
            res.send(err.toString());
        });
});

export default router;
