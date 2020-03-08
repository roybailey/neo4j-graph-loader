"use strict";
import logger from "../util/logger";
import parse from "csv-parse/lib/sync";

logger.debug("Loaded neo4j-converter");

export interface NodeLink {
    id: string;
    labels: string[];
    linked: string;
}


export interface Node {
    id: string;
    labels: string[];
    links: NodeLink[];
}


export interface GraphRecord {
    id: string;
    labels: string[];
    link?: string;
}


const cleanID = (id?: string) => (id) ? id.replace(/[\W_]+/g, "_") : id;


export function neo4jCopyProperties(node: any, target: any, includes: string[] = [], excludes: string[] = ["id", "labels", "links", "link", "linked"]): string {
    const isIncluded = (prop: string) => includes.length == 0 || includes.findIndex(it => it == prop) >= 0;
    const isExcluded = (prop: string) => excludes.length != 0 && excludes.findIndex(it => it == prop) >= 0;
    for (const prop in node) {
        if (Object.prototype.hasOwnProperty.call(node, prop) && isIncluded(prop) && !isExcluded(prop)) {
            target[prop] = node[prop];
        }
    }
    return target;
}


export function neo4jNodeProperties(node: any, includes: string[] = [], excludes: string[] = ["id", "labels", "link", "linked"]): string {
    const props: string[] = [];
    const isIncluded = (prop: string) => includes.length == 0 || includes.findIndex(it => it == prop) >= 0;
    const isExcluded = (prop: string) => excludes.length != 0 && excludes.findIndex(it => it == prop) >= 0;
    for (const prop in node) {
        if (Object.prototype.hasOwnProperty.call(node, prop) && isIncluded(prop) && !isExcluded(prop)) {
            props.push(` ${prop}: \"${node[prop]}\"`);
        }
    }
    return props.join(",");
}


export function cleanEmptyProperties(record: any) {
    for (const prop in record) {
        if (Object.prototype.hasOwnProperty.call(record, prop) && record[prop] == "") {
            delete record[prop];
        }
    }
    return record;
}


export function neo4jRecord2Cypher(data: GraphRecord[]): string {
    const cypher: string[] = [];
    let query = "";

    data.map(original => {
        const record = Object.assign({}, original);
        record.id = cleanID(record.id) || record.id;
        record.link = cleanID(record.link);
        if (record.link) {
            query = `create (${record.id})-[:${record.labels.join(":")} { ${neo4jNodeProperties(record)} }]->(${record.link})`;
        } else {
            query = `create (${record.id}:${record.labels.join(":")} { ${neo4jNodeProperties(record)} })`;
        }
        cypher.push(query);
    });

    const result = cypher.join("\n");
    return result;
}


export function neo4jCsv2Record(csv: string): GraphRecord[] {
    //logger.debug(`\n\n${csv}\n\n`);
    const records: GraphRecord[] = parse(csv, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        skip_empty_lines: true,
        // eslint-disable-next-line @typescript-eslint/camelcase
        relax_column_count: true,
        columns: (header: string[]) => {
            return header.map(name => name.toLowerCase());
        }
    });
    const result = records
        .map(it => {
            it.labels = it.labels.toString().split(":");
            return it;
        })
        .map(it => cleanEmptyProperties(it));
    return result;
}


export function neo4jNode2Record(data: Node[]): GraphRecord[] {
    const records: GraphRecord[] = [];
    let record;

    data.map(node => {
        record = {id: node.id, labels: node.labels};
        neo4jCopyProperties(node, record);
        records.push(record);
        if (node.links && node.links.length > 0) {
            node.links.map(link => {
                record = {id: node.id, labels: link.labels, link: link.linked};
                neo4jCopyProperties(link, record);
                records.push(record);
            });
        }
    });

    return records;
}


export function neo4jCsv2Cypher(csv: string): string {
    return neo4jRecord2Cypher(neo4jCsv2Record(csv));
}


export function neo4jNode2Cypher(data: Node[]): string {
    return neo4jRecord2Cypher(neo4jNode2Record(data));
}


