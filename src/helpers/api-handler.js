const { createMongoDBConnection } = require("src/connections/mongoDB");

let dbConfig = { 
    db: null,
    isConnected: false 
};

const apiHandler = (handler) => {
    return async (req, res) => {

        if(!dbConfig.isConnected) {
            await createMongoDBConnection({ dbConfigObj: dbConfig });
        }

        handler(req, res, dbConfig.db);
    }
};

module.exports = { apiHandler };