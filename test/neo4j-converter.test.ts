import {
    neo4jCsv2Cypher,
    neo4jCsv2Record,
    neo4jNode2Cypher,
    neo4jNode2Record,
    neo4jRecord2Cypher
} from "../src/graph/neo4j-converter";

import {dataCsvPack1, dataCypherPack1, dataJsonPack1, dataRecordsPack1} from "./datasets";


describe("neo4jRecord2Cypher", () => {
    it("should return cypher from records", () => {
        expect(neo4jRecord2Cypher(dataRecordsPack1))
            .toEqual(dataCypherPack1);
    });
});


describe("neo4jJson2Record", () => {
    it("should return records from json", () => {
        expect(neo4jNode2Record(dataJsonPack1))
            .toEqual(dataRecordsPack1);
    });
});


describe("neo4jJson2Cypher", () => {
    it("should return cypher from json", () => {
        expect(neo4jNode2Cypher(dataJsonPack1))
            .toEqual(dataCypherPack1);
    });
});


describe("neo4jCsv2Record", () => {
    it("should return records from csv text", () => {
        expect(neo4jCsv2Record(dataCsvPack1))
            .toEqual(dataRecordsPack1);
    });
});


describe("neo4jCsv2Cypher", () => {
    it("should return cypher from csv", () => {
        expect(neo4jCsv2Cypher(dataCsvPack1))
            .toEqual(dataCypherPack1);
    });
});

