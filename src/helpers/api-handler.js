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
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );

            if (req.method === "OPTIONS") {
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                return res.status(200).json({});
            }

            await handler(req, res, dbConfig.db);
        } catch(err) {
            console.error("handler error", err);
            res.status(500).json({ message: "Internal server error", err });
        }
    }
};

module.exports = { apiHandler };