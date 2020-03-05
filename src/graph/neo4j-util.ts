"use strict";
import {QueryResult} from "neo4j-driver";
import neo4j from "neo4j-driver";
import logger from "../util/logger";

const neo4jUrl = (process.env.NEO4J_URL||"bolt://localhost:7687");
const neo4jUsername = (process.env.NEO4J_USERNAME||"neo4j");
const neo4jPassword = (process.env.NEO4J_PASSWORD||"neo4j");
const driver = neo4j.driver(neo4jUrl, neo4j.auth.basic(neo4jUsername, neo4jPassword));


export function neo4jShutdown() {
    driver.close().then(() => logger.debug("Finished"));
}


export const NOHANDLER = (result: QueryResult) => Promise.resolve();


export const COUNTHANDLER = (result: QueryResult) => {
    // On result, get count from first record
    const count = result.records[0].get("count");
    // Log response
    logger.debug(`Graph now contains...${count} nodes`);
    return Promise.resolve(count.toNumber());
};


export function runCypher(query: string, params: any, handler: (result: QueryResult) => any) {
    const session = driver.session();
    logger.debug(query);
    return session.run(query, params)
        .then((result: QueryResult) => {
            const passback = handler(result);
            return session.close().then(r => Promise.resolve(passback));
        })
        .catch((err: any) => {
            logger.error(err);
        });
}


export function clearGraph() {
    logger.debug("clearGraph()");
    return runCypher("match (n) optional match (n)-[r]-() delete r,n", {}, NOHANDLER);
}


export function countGraph() {
    logger.debug("countGraph()");
    return runCypher("MATCH (n) RETURN count(n) as count", {}, COUNTHANDLER);
}
