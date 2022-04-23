const { queryPromise } = require("src/helpers/db")

const requestHandler = async (req, res) => {
    switch(req.method) {
        case "GET": {
            try {
                const rows = await queryPromise({ query: "SELECT * FROM todos"});
                res.send({ todos: rows })
            } catch(error) {
                res.status(500).json({ message: "Internal server error"});
            }
            break;
        }
    }
};

export default requestHandler;