const { queryPromise } = require("src/helpers/db");

const requestHandler = async (req, res) => {
    const { id } = req.query;
    
    switch(req.method) {
        case "GET": {
            try {
                const todo = await queryPromise({ query: `SELECT * FROM todos WHERE ID=${parseInt(id)}`});
                res.send({ todo })
            } catch(error) {
                res.status(500).json({ message: "Internal server error"});
            }
            break;
        }
    }
};

export default requestHandler;