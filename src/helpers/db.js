const { connection } = require("src/connections");

const queryPromise = ({ query }) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if(error) {
                return reject(error);
            }
            resolve(results);
        })
    });
};

module.exports = {
    queryPromise
};