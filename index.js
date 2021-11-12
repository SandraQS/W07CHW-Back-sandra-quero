require("dotenv").config();
const initDB = require("./database/index");
const { initServer } = require("./server/index");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 3001;

initDB(process.env.MONGODB_STRING_NETWORKS);
initServer(port);
