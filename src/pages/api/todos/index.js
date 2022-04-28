const { queryPromise } = require("src/helpers/db")
const { createMongoDBConnection } = require("src/connections/mongoDB")
const { v4 } = require('uuid');
const { apiHandler } = require("src/helpers/api-handler")

const requestHandler = async (req, res, db) => {
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
                //const rows = await queryPromise({ query: "SELECT * FROM todos" });
                //console.log(db)
                if(db !== null) {
                    const todos = await db.find({ }).toArray();
                    res.send({ todos });
                } else {
                    throw new Error();
                }
            } catch(error) {
                console.error("api", error)
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
                console.error("api error", error)
                res.status(500).json({ message: "Internal server error"});
            }
            break;
        }
        case "POST": {
            try {
                const { isActive, name } = JSON.parse(req.body);

                const rows = await queryPromise({ query: "SELECT * FROM todos"});

                let position = 0;
                rows.forEach(item => {
                    if(item.position > position) {
                        position = item.position
                    }
                });
                position = position + 1;

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

const handler = apiHandler(requestHandler);
export default handler;