const { connection } = require("../../../connections");

const fetchTodos = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM todos", (error, results) => {
            if(error) {
                return reject(error);
            }
            resolve(results);
        })
    });
}

const requestHandler = async (req, res) => {
    switch(req.method) {
        case "GET": {
            try {
                const rows = await fetchTodos();
                res.send({ todos: rows })
            } catch(error) {
                res.status(500).json({ message: "Internal server error"});
            }
            break;
        }
    }
};

export default requestHandler;