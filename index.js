require("dotenv").config();
const initDB = require("./database/index");
const { initServer } = require("./server/index");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 3001;

/// OJO, esto habria que ponerlo dentro de una IIFE, con un asymc await.
initDB(process.env.MONGODB_STRING_NETWORKS);
initServer(port);
