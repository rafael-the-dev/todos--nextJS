const config = require("config");
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://rafael-the-dev:iH.-qJftk8g9cgc@cluster0.z64j5.mongodb.net/myFirstDatabase?authMechanism=DEFAULT";//config.get("mongoDBConfig.url");
const dbName = "myFirstDatabase";//config.get("mongoDBConfig.db");
const collectionName = "todos";//config.get("mongoDBConfig.collection");

const mongoDBConnection = new MongoClient(url);

let clusterCollection = null;

const createMongoDBConnection = async ({ dbConfigObj }) => {
    let clusterDB;
    try {

        mongoDBConnection.on("connectionCreated", () => {
            dbConfigObj.isConnected = true;
            clusterDB = mongoDBConnection.db(dbName);
            clusterCollection = clusterDB.collection(collectionName);
            dbConfigObj.db = clusterCollection;
        });

        mongoDBConnection.on("close", () => {
            dbConfigObj.db = null;
            dbConfigObj.isConnected = false
        });

        await mongoDBConnection.connect();
        console.log('Connected successfully to server');
    } catch(err) {
        console.error("mongo error", err);
        mongoDBConnection.close();
    }
    return clusterDB;
};

module.exports = { createMongoDBConnection };    