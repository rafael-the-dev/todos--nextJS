const config = require("config");
const { MongoClient } = require("mongodb");

const url = config.get("mongoDBConfig.url");
const mongoDBConnection = new MongoClient(url);
let clusterCollection;

const createConnection = async () => {
    try {
        await mongoDBConnection.connect();
        console.log('Connected successfully to server');

        const clusterDB = client.db(dbName);
        clusterCollection = db.collection('documents');

    } catch(err) {
        console.error(err);
        mongoDBConnection.close();
    }
};

createConnection();
const db = () => clusterCollection;

module.exports = { db };    