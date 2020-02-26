import { neo4jNode2Cypher } from "../src/graph/neo4j-converter";

describe("neo4jJson2Cypher", () => {
    it("should return cypher", () => {
        const data = [ {id: "the-matrix", labels: [], links: [], title: "The Matrix" } ];
        expect(neo4jNode2Cypher(data))
            .toBe("create (the-matrix: {  title: \"The Matrix\" })");
    });
});

