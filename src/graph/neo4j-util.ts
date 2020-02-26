"use strict";
import {QueryResult} from "neo4j-driver";
import neo4j from "neo4j-driver";


// TODO replace hard-coded values for Neo4j with environment variables
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "localhost"));


export function neo4jShutdown() {
    driver.close().then(() => console.log("Finished"));
}


export const NOHANDLER = (result: QueryResult) => Promise.resolve();


export const COUNTHANDLER = (result: QueryResult) => {
    // On result, get count from first record
    const count = result.records[0].get("count");
    // Log response
    console.log(`Graph now contains...${count} nodes`);
    return Promise.resolve(count.toNumber());
};


export function runCypher(query: string, params: any, handler: (result: QueryResult) => any) {
    const session = driver.session();
    console.log(query);
    return session.run(query, params)
        .then((result: QueryResult) => {
            const passback = handler(result);
            return session.close().then(r => Promise.resolve(passback));
        })
        .catch((err: any) => {
            console.log(err);
        });
}


export function clearGraph() {
    console.log("clearGraph()");
    return runCypher("match (n) optional match (n)-[r]-() delete r,n", {}, NOHANDLER);
}


export function countGraph() {
    console.log("countGraph()");
    return runCypher("MATCH (n) RETURN count(n) as count", {}, COUNTHANDLER);
}
