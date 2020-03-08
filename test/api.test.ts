import request from "supertest";
import app from "../src/app";
import {dataCsvPack1, dataCypherPack1, dataJsonPack1} from "./datasets";


describe("GET /api", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api")
            .expect(200);
    });
});


describe( "POST /api/csv2cypher", () => {
    it("should convert csv into cypher", async () => {
        const res = await request(app)
            .post("/api/csv2cypher")
            .set("Content-Type", "text/plain")
            .send(dataCsvPack1);
        console.log("----- expected -----");
        console.log(dataCypherPack1);
        console.log("----- actual -----");
        console.log(res.text);
        console.log("-----");
        expect(res.status).toEqual(200);
        expect(res.type).toEqual("text/plain");
        expect(res.text).toEqual(dataCypherPack1);
    });
});


describe( "POST /api/json2cypher", () => {
    it("should convert json into cypher", async () => {
        const res = await request(app)
            .post("/api/json2cypher")
            .set("Content-Type", "application/json")
            .send(dataJsonPack1);
        console.log("----- expected -----");
        console.log(dataCypherPack1);
        console.log("----- actual -----");
        console.log(res.text);
        console.log("-----");
        expect(res.status).toEqual(200);
        expect(res.type).toEqual("text/plain");
        expect(res.text).toEqual(dataCypherPack1);
    });
});


describe( "POST /api/cypher2neo4j", () => {
    it("should execute cypher into neo4j", async () => {
        const res = await request(app)
            .post("/api/cypher2neo4j")
            .set("Content-Type", "text/plain")
            .send(dataCypherPack1);
        console.log("----- expected -----");
        console.log("2");
        console.log("----- actual -----");
        console.log(res.text);
        console.log("-----");
        expect(res.status).toEqual(200);
        expect(res.type).toEqual("text/plain");
        expect(res.text).toEqual("2");
    });
});
