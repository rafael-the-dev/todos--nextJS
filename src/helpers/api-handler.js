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

        try {
            handler(req, res, dbConfig.db);
        }
        catch(err) {
            console.error("handler error", err);
            res.status(500).json({ message: "Internal server error"});
        }
    }
};

module.exports = { apiHandler };