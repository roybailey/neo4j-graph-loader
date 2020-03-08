import winston from "winston";

const options: winston.LoggerOptions = {
    format: process.env.NODE_ENV === "production" ? winston.format.json() : winston.format.simple(),
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" })
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging Initialized at Debug Level");
}

export default logger;
