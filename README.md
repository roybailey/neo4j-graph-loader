# neo4j-graph-loader

**node server to receive generic graph data in either JSON or CSV format and convert into Cypher**

 Status        | Description
 ------------- | ------------- 
 **STATUS**    | _Under Construction_ 
 **STRATEGY**  | _Spike working example and deploy to AWS_    


## Design

**Lightweight server to handle open request (JSON,CSV) response (Cypher) server**  

No security required.  No Neo4j required.  Just a request/response server with a clear purpose.


## Getting started

**Standard node server setup**


### Prerequisites

Built with npm v6, node v10, tested on Mac only.

Access to Neo4j local server may be required for some manual tests but not required to build and deploy.


### Building and Testing locally

* `npm install`
* `npm test` to run the tests
* `npm run dev` to run a development version of the server (without need to build)


### Building and Running the server

* `npm run build` to build the server code into the `dist` folder
* `npm run server` to run the server code from the `dist` folder


### Building and Running a Docker Image

* `npm run docker` to build the docker image of the `dist` folder
* `docker run -p 49160:3000 roybaileybiz/neo4j-graph-loader` to execute the docker instance mapped to port 49160


### Verifying Running Instance

> `POST http://<server>:<port>/api/json2cypher` with below body json...

```
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
]
```

> Response will be 200 text/plain with below body text...

```
create (football:Sport {  title: "Football" })
create (tennis:Sport {  title: "Tennis" })
create (anna:Person {  title: "Anna" })
create (anna)-[:LINKED {  rating: "5" }]->(tennis)
create (brad:Person {  title: "Brad" })
create (brad)-[:LINKED {  rating: "3" }]->(tennis)
create (brad)-[:LINKED {  rating: "5" }]->(football)
create (carl:Person {  title: "Carl" })
create (carl)-[:LINKED {  rating: "3" }]->(football)
```

### Key Configuration

_Details of where key configuration files are stored in the repository and what purpose they have._

Property Name          | Description
 --------------------- | ------------- 
 `env.NEO4J_URL`       | e.g. neo4j database url
 `env.NEO4J_USERNAME`  | e.g. neo4j username    
 `env.NEO4J_PASSWORD`  | e.g. neo4j password    


## Handover Suggestions

_Nuggets of Knowledge and Thinking from last people to work on the project._
_e.g. suggestions for technical debt reduction, simplification or enhancements_

* this code is still under construction
