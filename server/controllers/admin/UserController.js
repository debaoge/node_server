const { error } = require('console');
const JWT = require("../../util/JWT")

const UserService = require('../../services/admin/UserService');

const UserController = {
    login: async (req, res) => {
        console.log('[INFO:] UserController: req.body: ', req.body);

        try {
            const { username, password } = req.body;
            const result = await UserService.login({ username, password });

            if (result.length === 0) {
                console.log('Invalid username or password');
                res.status(401).send({
                    code: "-1",
                    error: "Invalid username or password",
                });
            } else {
                const payload = {
                    userId: result[0]._id || result[0].id, // 兼容 _id 和 id
                    username: result[0].username
                };

                const token = JWT.generate(payload, "1d");
                console.log('[INFO:] UserController: token 有效期不工作');
                res.header("Authorization", token)

                res.send({
                    ActionType: "OK",
                    data:{
                        username:result[0].username,
                        gender:result[0].gender ? result[0].gender : 0,
                        introduction:result[0].introduction,
                        avatar:result[0].avatar,
                        role:result[0].role
                    }
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