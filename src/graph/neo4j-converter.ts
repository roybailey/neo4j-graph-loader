"use strict";
import logger from "../util/logger";


export interface Link {
    id: string;
    linked: string;
}


export interface Node {
    id: string;
    labels: string[];
    links: Link[];
}


export interface GraphRecord {
    id: string;
    labels: string[];
    link?: string;
}


export function neo4jNodeProperties(node: any, includes: string[] = [], excludes: string[] = ["id", "labels", "link", "linked"]): string {
    const props: string[] = [];
    const isIncluded = (prop: string) => includes.length == 0 || includes.findIndex(it => it == prop) >= 0;
    const isExcluded = (prop: string) => excludes.length == 0 || excludes.findIndex(it => it == prop) >= 0;
    for (const prop in node) {
        if (Object.prototype.hasOwnProperty.call(node, prop) && isIncluded(prop) && !isExcluded(prop)) {
            props.push(` ${prop}: \"${node[prop]}\"`);
        }
    }
    return props.join(",");
}


export function neo4jNode2Cypher(data: Node[]): string {
    logger.debug("neo4jNode2Cypher\n" + JSON.stringify(data));
    const cypher: string[] = [];

    data.map(node => {
        const labels: string = node.labels.join(":");
        let query = `create (${node.id}:${labels} { ${neo4jNodeProperties(node)} })`;
        cypher.push(query);
        if (node.links && node.links.length > 0) {
            node.links.map(link => {
                query = `create (${node.id})-[:${labels} { ${neo4jNodeProperties(link)} }]->(${link.id})`;
                cypher.push(query);
            });
        }
    });

    const result = cypher.join("\r\n");
    logger.debug("Cypher\n" + result);
    return result;
}


export function neo4jCsv2Record(csv: string): GraphRecord[] {
    return [];
}


export function neo4jRecord2Cypher(data: GraphRecord[]): string {
    logger.debug("neo4jCsv2Node\n" + JSON.stringify(data));
    const cypher: string[] = [];
    let query = "";

    data.map(record => {
        if(record.link) {
            query = `create (${record.id})-[:${record.labels.join(":")} { ${neo4jNodeProperties(record)} }]->(${record.link})`;
        } else {
            query = `create (${record.id}:${record.labels.join(":")} { ${neo4jNodeProperties(record)} })`;
        }
        cypher.push(query);
    });

    const result = cypher.join("\n");
    logger.debug("Cypher\n" + result);
    return result;
}
