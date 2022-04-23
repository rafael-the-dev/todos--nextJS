const { queryPromise } = require("src/helpers/db");

const requestHandler = async (req, res) => {
    const id = parseInt(req.query.id);
    
    try {
        switch(req.method) {
            case "DELETE": {
                await queryPromise({ query: `DELETE FROM todos WHERE ID=${id}`});
                res.status(204).send()
                break;
            }
            case "GET": {
                const todo = await queryPromise({ query: `SELECT * FROM todos WHERE ID=${id}`});
                res.send({ todo })
                break;
            }
        }
    } catch(error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

export default requestHandler;