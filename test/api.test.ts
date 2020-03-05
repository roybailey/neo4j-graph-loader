import request from "supertest";
import app from "../src/app";

const normalise = (str: string) => str.trim().split("\r\n").join("\n");


describe("GET /api", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api")
            .expect(200);
    });
});

const jsonSample = `
[
  {
    "id": "football",
    "labels": [
      "Sport"
    ],
    "title": "Football"
  },
  {
    "id": "tennis",
    "labels": [
      "Sport"
    ],
    "title": "Tennis"
  },
  {
    "id": "anna",
    "labels": [
      "Person"
    ],
    "title": "Anna",
    "links": [
      {
        "id": "tennis",
        "labels": [
          "LIKES"
        ],
        "rating": 5
      }
    ]
  },
  {
    "id": "brad",
    "labels": [
      "Person"
    ],
    "title": "Brad",
    "links": [
      {
        "id": "tennis",
        "labels": [
          "LIKES"
        ],
        "rating": 3
      },
      {
        "id": "football",
        "labels": [
          "LIKES"
        ],
        "rating": 5
      }
    ]
  },
  {
    "id": "carl",
    "labels": [
      "Person"
    ],
    "title": "Carl",
    "links": [
      {
        "id": "football",
        "labels": [
          "LIKES"
        ],
        "rating": 3
      }
    ]
  }
]`;

const cypherResponse = `
create (football:Sport {  title: "Football" })
create (tennis:Sport {  title: "Tennis" })
create (anna:Person {  title: "Anna" })
create (anna)-[:LINKED {  rating: "5" }]->(tennis)
create (brad:Person {  title: "Brad" })
create (brad)-[:LINKED {  rating: "3" }]->(tennis)
create (brad)-[:LINKED {  rating: "5" }]->(football)
create (carl:Person {  title: "Carl" })
create (carl)-[:LINKED {  rating: "3" }]->(football)
`;


// describe( "POST /api/csv2json", () => {
//     it("should convert csv into json graph", async () => {
//         const res = await request(app)
//             .post("/api/csv2json")
//             .send(JSON.parse(jsonSample));
//         expect(res.status).toEqual(200);
//         expect(res.type).toEqual("application/json");
//         console.log("----- expected -----");
//         console.log(normalise(jsonSample));
//         console.log("----- actual -----");
//         console.log(normalise(res.text));
//         console.log("-----");
//         expect(normalise(res.text)).toEqual(normalise(jsonSample));
//     });
// });
//
//
// describe( "POST /api/csv2cypher", () => {
//     it("should convert csv into cypher", async () => {
//         const res = await request(app)
//             .post("/api/csv2cypher")
//             .send(JSON.parse(jsonSample));
//         expect(res.status).toEqual(200);
//         expect(res.type).toEqual("text/plain");
//         console.log("----- expected -----");
//         console.log(normalise(cypherResponse));
//         console.log("----- actual -----");
//         console.log(normalise(res.text));
//         console.log("-----");
//         expect(normalise(res.text)).toEqual(normalise(cypherResponse));
//     });
// });
//
//
// describe( "POST /api/json2cypher", () => {
//     it("should convert json into cypher", async () => {
//         const res = await request(app)
//             .post("/api/json2cypher")
//             .send(JSON.parse(jsonSample));
//         expect(res.status).toEqual(200);
//         expect(res.type).toEqual("text/plain");
//         console.log("----- expected -----");
//         console.log(normalise(cypherResponse));
//         console.log("----- actual -----");
//         console.log(normalise(res.text));
//         console.log("-----");
//         expect(normalise(res.text)).toEqual(normalise(cypherResponse));
//     });
// });


describe( "POST /api/cypher2neo4j", () => {
    it("should execute cypher into neo4j", async () => {
        const res = await request(app)
            .post("/api/cypher2neo4j")
            .send(cypherResponse);
        expect(res.status).toEqual(200);
        expect(res.type).toEqual("text/plain");
        console.log("----- expected -----");
        console.log("2");
        console.log("----- actual -----");
        console.log(res.text);
        console.log("-----");
        expect(res.text).toEqual("2");
    });
});
