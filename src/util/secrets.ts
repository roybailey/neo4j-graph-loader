import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const NEO4J_URI = prod ? process.env["NEO4J_URI"] : process.env["NEO4J_URI_LOCAL"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!NEO4J_URI) {
    if (prod) {
        logger.error("No Neo4j connection string. Set NEO4J_URI environment variable.");
    } else {
        logger.error("No mongo connection string. Set NEO4J_URI_LOCAL environment variable.");
    }
    process.exit(1);
}
