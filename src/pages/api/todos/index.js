//const { queryPromise } = require("src/helpers/db")
//const { createMongoDBConnection } = require("src/connections/mongoDB")
const { v4 } = require('uuid');
const { apiHandler } = require("src/helpers/api-handler")

const requestHandler = async (req, res, db) => {
    if(db === null) {
        throw new Error();
    }

    switch(req.method) {
        case "DELETE": {
            const { filter } = req.query;
            
            if(filter === "completed") {
                //await queryPromise({ query: "DELETE FROM todos WHERE isActive=?", values: [ 0 ] });
                await db.deleteMany({ isComplete: true });
            }
            res.status(204).send();
        
            break;
        }
        case "GET": {
            //const rows = await queryPromise({ query: "SELECT * FROM todos" });
            const todos = await db.find({ }).toArray();
            res.send({ todos });
            
            break;
        }
        case "PATCH": {
            const { from, to } = JSON.parse(req.body);

            //await queryPromise({ query: "UPDATE todos SET position=? WHERE ID=?", values: [ to.position, from.ID] });
            //await queryPromise({ query: "UPDATE todos SET position=? WHERE ID=?", values: [ from.position, to.ID] });
            
            await db.update({ ID: from.ID }, { $set: { position: to.position } });
            await db.update({ ID: to.ID }, { $set: { position: from.position } });
            res.status(204).send()
            
            break;
        }
        case "POST": {
            const { isComplete, task } = JSON.parse(req.body);

            //const rows = await queryPromise({ query: "SELECT * FROM todos"});
            const rows = await db.find({}).toArray();

            let position = 0;
            rows.forEach(item => {
                if(item.position > position) {
                    position = item.position
                }
            });
            position = position + 1;

            /*await queryPromise({ 
                query: `INSERT INTO todos (ID, name, isActive, position) VALUES (?, ?, ?, ?)`,
                values: [ v4(), name, isActive, position]
            })*/

            await db.insert({
                ID: v4(),
                isComplete,
                position,
                task
            })

            res.status(204).send()
            break;
        }
    }
};

const handler = apiHandler(requestHandler);
export default handler;