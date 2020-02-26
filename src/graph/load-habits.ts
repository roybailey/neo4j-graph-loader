"use strict";
import logger from "../util/logger";
import fs from "fs";
import {readCsv} from "../util/csv-utils";
import {
    neo4jNodeProperties
} from "./neo4j-converter";
import {
    runCypher,
    clearGraph,
    countGraph,
    NOHANDLER,
    neo4jShutdown
} from "./neo4j-util";

interface Node {
    id: string;
    labels: string[];
    title: string;
    description: string;
}

interface Link {
    id: string;
    linked: string;
    confidence: number;
    impact: number;
    dependencies: number;
    effort: number;
    reach: number;
}

const nodes: Node[] = readCsv("./testdata/load-habits-nodes.csv");
nodes.forEach(it => {
    it.id = it.id.replace("-", "_");
    it.labels = [it.labels.toString()];
});
logger.debug(JSON.stringify(nodes, null, 2));
const links: Link[] = readCsv("./testdata/load-habits-links.csv");
links.forEach(it => {
    it.id = it.id.replace("-", "_");
    it.linked = it.linked.replace("-", "_");
});
logger.debug(JSON.stringify(links, null, 2));

function append(filename: string, line: string) {
    fs.appendFileSync(filename, line + "\n", "utf8");
}

function loadGraph() {
    logger.debug("loadGraphNodes()");
    const filename = "cypher.log";
    fs.writeFileSync(filename, "");
    nodes.map(node => {
        const labels: string = node.labels.join(":");
        const query = `create (${node.id}:${labels} { ${neo4jNodeProperties(node)} })`;
        append(filename, query);
    });
    links.map(link => {
        const query = `create (${link.id})-[:LINKED { ${neo4jNodeProperties(link, [], ["id", "linked"])} }]->(${link.linked})`;
        append(filename, query);
    });
    return runCypher(fs.readFileSync(filename, "utf8"), {}, NOHANDLER);
}

// execute main flow...
countGraph()
    .then(() => clearGraph())
    .then(() => countGraph())
    .then(() => loadGraph())
    .then(() => countGraph())
    .then(() => {
        console.log("Shutting down...");
        neo4jShutdown();
    })
    .catch((err: any) => {
        console.log(err);
    });
