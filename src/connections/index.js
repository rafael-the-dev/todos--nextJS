const { createConnection } = require("mysql");
const config = require("config")

const dbConfig = config.get("dbConfig");
const connection = createConnection(dbConfig);


connection.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    
    console.log('connected as id ' + connection.threadId);
});

module.exports = {
    connection
};