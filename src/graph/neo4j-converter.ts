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


export function neo4jNodeProperties(node: any, includes: string[] = [], excludes: string[] = ["id", "labels", "links", "linked"]): string {
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
    logger.debug("Converting\n" + data);
    const cypher: string[] = [];

    data.map(node => {
        const labels: string = node.labels.join(":");
        let query = `create (${node.id}:${labels} { ${neo4jNodeProperties(node)} })`;
        cypher.push(query);
        if (node.links && node.links.length > 0) {
            node.links.map(link => {
                query = `create (${node.id})-[:LINKED { ${neo4jNodeProperties(link)} }]->(${link.id})`;
                cypher.push(query);
            });
        }
    });

    const result = cypher.join("\r\n");
    logger.debug("Cypher\n" + result);
    return result;
}
