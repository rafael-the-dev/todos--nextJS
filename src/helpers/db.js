const { connection } = require("src/connections");

const queryPromise = ({ query, values }) => {
    values = values ? values : [];

    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
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