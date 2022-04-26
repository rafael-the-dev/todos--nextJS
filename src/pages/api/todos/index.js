const { queryPromise } = require("src/helpers/db")
const { v4 } = require('uuid');

const requestHandler = async (req, res) => {
    switch(req.method) {
        case "DELETE": {
            try {
                const { filter } = req.query;
                
                if(filter === "completed") {
                    await queryPromise({ query: "DELETE FROM todos WHERE isActive=?", values: [ 0 ] });
                }
                res.status(204).send();
            } catch(error) {
                console.error(error)
                res.status(500).json({ message: "Internal server error"});
            }
            break;
        }
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
        case "PATCH": {
            try {
                const { from, to } = JSON.parse(req.body);

                await queryPromise({ query: "UPDATE todos SET position=? WHERE ID=?", values: [ to.position, from.ID] });
                await queryPromise({ query: "UPDATE todos SET position=? WHERE ID=?", values: [ from.position, to.ID] });
                
                res.status(204).send()
            } catch(error) {
                console.error(error)
                res.status(500).json({ message: "Internal server error"});
            }
            break;
        }
        case "POST": {
            try {
                const { isActive, name } = JSON.parse(req.body);

                const rows = await queryPromise({ query: "SELECT * FROM todos"});

                const position = rows.length === 0 ? 1 : rows[rows.length - 1].position + 1;

                await queryPromise({ 
                    query: `INSERT INTO todos (ID, name, isActive, position) VALUES (?, ?, ?, ?)`,
                    values: [ v4(), name, isActive, position]
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