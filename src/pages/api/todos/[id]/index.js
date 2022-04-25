const { queryPromise } = require("src/helpers/db");

const requestHandler = async (req, res) => {
    const { id } = req.query;
    const { name } = req.body;
    
    try {
        switch(req.method) {
            case "DELETE": {
                await queryPromise({ query: `DELETE FROM todos WHERE ID="${id}"`});
                res.status(204).send()
                break;
            }
            case "GET": {
                const todos = await queryPromise({ query: `SELECT * FROM todos WHERE ID="${id}"`});
                if(todos.length === 0) 
                    res.status(404).json({})
                else
                    res.send({ todo: todos[0] })
                break;
            }
            case "PATCH": {
                await queryPromise({ query: `UPDATE todos SET name="${name}" WHERE ID="${id}"`});
                res.status(204).send()
                break;
            }
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error"});
    }
};

export default requestHandler;