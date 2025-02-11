const { error } = require('console');
const UserService = require('../../services/admin/UserService');

const UserController = {
    login: async (req, res) => {
        console.log('user controller: req.body: ', req.body);
        
        try {
            const { username, password } = req.body;
            const result = await UserService.login({ username, password });

            if (result.length === 0) {
                res.status(401).send({
                    code: "-1",
                    error: "Invalid username or password",
                });
            } else {
                res.send({
                    ActionType: "OK",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).send({
                code: "-1",
                error: "Internal server error",
            });
        }
    },
};

module.exports = UserController;