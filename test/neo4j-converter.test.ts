import {
    neo4jCsv2Record,
    neo4jNode2Cypher,
    neo4jRecord2Cypher
} from "../src/graph/neo4j-converter";


const dataCsv = `
        id,labels,link,title
        "the-matrix","MOVIE",,"The Matrix"
        "keanu-reeves","ACTOR",,"Keanu Reeves"
        "keanu-reeves","ACTED_IN","the-matrix"
        `;

const dataRecords: any[] = [];
dataRecords.push({id: "the-matrix", labels: ["MOVIE"], title: "The Matrix"});
dataRecords.push({id: "keanu-reeves", labels: ["ACTOR"], title: "Keanu Reeves"});
dataRecords.push({id: "keanu-reeves", labels: ["ACTED_IN"], link: "the-matrix"});


const expectedCypher = `
create (the-matrix:MOVIE {  title: \"The Matrix\" })
create (keanu-reeves:ACTOR {  title: \"Keanu Reeves\" })
create (keanu-reeves)-[:ACTED_IN {  }]->(the-matrix)
`.trim();


describe("neo4jJson2Cypher", () => {
    it("should return cypher", () => {
        const data = [{id: "the-matrix", labels: [], links: [], title: "The Matrix"}];
        expect(neo4jNode2Cypher(data))
            .toBe(expectedCypher);
    });
});


describe("neo4jCsv2Record", () => {
    it("should return records from csv text", () => {
        expect(neo4jCsv2Record(dataCsv))
            .toEqual(dataRecords);
    });
});


describe("neo4jRecord2Cypher", () => {
    it("should return cypher", () => {
        expect(neo4jRecord2Cypher(dataRecords))
            .toBe(expectedCypher);
    });
});

