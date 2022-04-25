const { queryPromise } = require("src/helpers/db")
const { v4 } = require('uuid');

const requestHandler = async (req, res) => {
    switch(req.method) {
        case "GET": {
            try {
                const rows = await queryPromise({ query: "SELECT * FROM todos" });
                res.send({ todos: rows })
            } catch(error) {
                console.error(error)
                res.status(500).json({ message: "Internal server error"});
            }
            break;
        }
        case "POST": {
            try {
                const { isActive, name } = req.body;

                const rows = await queryPromise({ query: "SELECT * FROM todos"});
                await queryPromise({ 
                    query: `INSERT INTO todos (ID, name, isActive, position) VALUES (?, ?, ?, ?)`,
                    values: [ v4(), name, isActive, rows.length + 1]
                });
                res.status(204).send()
            } catch(error) {
                console.log(error)
                res.status(500).json({ message: "Internal server error"});
            }
            break;
        }
    }
};

export default requestHandler;