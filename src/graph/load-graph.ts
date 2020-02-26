"use strict";
import logger from "../util/logger";
import {neo4jNode2Cypher, Node} from "./neo4j-converter";
import {clearGraph, countGraph, neo4jShutdown, NOHANDLER, runCypher} from "./neo4j-util";
import fs from "fs";

// print process.argv
process.argv.forEach(function (val, index, array) {
    console.log(index + ": " + val);
});


// eslint-disable-next-line @typescript-eslint/no-var-requires
const [, , filename] = process.argv;
const data: Node[] = JSON.parse(fs.readFileSync(filename).toString());


function loadGraph() {
    logger.debug("loadGraph()");
    logger.debug(JSON.stringify(data, null, 2));
    const cypher = neo4jNode2Cypher(data);
    const filename = "cypher.log";
    fs.writeFileSync(filename, cypher);
    return runCypher(fs.readFileSync(filename, "utf8"), {}, NOHANDLER);
}


// execute main flow...
countGraph()
    .then(() => clearGraph())
    .then(() => countGraph())
    .then(() => loadGraph())
    .then(() => countGraph())
    .then(() => {
        logger.debug("Shutting down...");
        neo4jShutdown();
    });
