//const { queryPromise } = require("src/helpers/db");
const { apiHandler } = require("src/helpers/api-handler")

const requestHandler = async (req, res, db) => {
    if(db === null) {
        throw new Error();
    }

    const { id } = req.query;
    
    switch(req.method) {
        case "DELETE": {
            //await queryPromise({ query: `DELETE FROM todos WHERE ID="${id}"`});
            await db.deleteOne({ ID: id });
            res.status(204).send()
            break;
        }
        case "GET": {
            //const todos = await queryPromise({ query: `SELECT * FROM todos WHERE ID="${id}"`});
            const todo = await db.findOne({ ID: id })

            if(todo === null) 
                res.status(404).json({})
            else
                res.send(todo)
            break;
        }
        case "PATCH": {
            const { isComplete, task, position } = JSON.parse(req.body);
            /*await queryPromise({ 
                query: `UPDATE todos SET isActive=?, name=?, position=? WHERE ID=?`,
                values: [ isActive, name, position, id ] 
            });*/
            await db.update({ ID: id }, { $set: { isComplete, position, task } })
            res.status(204).send()
            break;
        }
    }
};

const handler = apiHandler(requestHandler);
export default handler;