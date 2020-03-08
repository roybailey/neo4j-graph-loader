"use strict";

// ------------------------------------------------------------
// DataSet 1
// ------------------------------------------------------------

export const dataCsvPack1 = `
id,labels,link,title
the-matrix,MOVIE,,The Matrix
keanu-reeves,ACTOR,,Keanu Reeves
keanu-reeves,ACTED_IN,the-matrix,
`;


export const dataJsonPack1: any[] = [
    {
        id: "the-matrix", labels: ["MOVIE"], links: [], title: "The Matrix"
    },
    {
        id: "keanu-reeves", labels: ["ACTOR"], title: "Keanu Reeves",
        links: [
            {
                labels: ["ACTED_IN"], linked: "the-matrix"
            }
        ]
    }
];


export const dataRecordsPack1: any[] = [];
dataRecordsPack1.push({id: "the-matrix", labels: ["MOVIE"], title: "The Matrix"});
dataRecordsPack1.push({id: "keanu-reeves", labels: ["ACTOR"], title: "Keanu Reeves"});
dataRecordsPack1.push({id: "keanu-reeves", labels: ["ACTED_IN"], link: "the-matrix"});


export const dataCypherPack1 = `
create (the_matrix:MOVIE {  title: \"The Matrix\" })
create (keanu_reeves:ACTOR {  title: \"Keanu Reeves\" })
create (keanu_reeves)-[:ACTED_IN {  }]->(the_matrix)
`.trim();


// ------------------------------------------------------------
// DataSet 2
// ------------------------------------------------------------

export const dataJsonPack2 = `
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

export const dataNodePack2 = JSON.parse(dataJsonPack2);

export const dataCypherPack2 = `
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
