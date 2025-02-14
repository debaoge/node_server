const { error } = require("console");
const JWT = require("../../util/JWT");

const UserService = require("../../services/admin/UserService");
const multer = require("multer");
const upload = multer({dest:'public/avataruploads/'})

const UserController = {
    login: async (req, res) => {
        console.log("[INFO:] UserController: req.body: ", req.body);

        try {
            const { username, password } = req.body;
            const result = await UserService.login({ username, password });

            if (result.length === 0) {
                console.log("Invalid username or password");
                res.status(401).send({
                    code: "-1",
                    error: "Invalid username or password",
                });
            } else {
                const payload = {
                    userId: result[0]._id || result[0].id, // 兼容 _id 和 id
                    username: result[0].username,
                };

                const token = JWT.generate(payload, "1d");
                console.log("[INFO:] UserController: token 有效期不工作");
                res.header("Authorization", token);

                res.send({
                    ActionType: "OK",
                    data: {
                        username: result[0].username,
                        gender: result[0].gender ? result[0].gender : 0,
                        introduction: result[0].introduction,
                        avatar: result[0].avatar,
                        role: result[0].role,
                    },
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

    upload: async (req, res) => {
        console.log('[INFO:] UserController: req.file: ', req.file);
        const { username, introduction, gender } = req.body

        const token = req.headers["authorization"].split(" ")[1];
        const avatar = `/avataruploads/${req.file.filename}`
        
        const payload = JWT.verify(token);

        // console.log("[INFO:] 从token中得到数据库 用的 userId ", payload.userId);
        console.log('[INFO:] UserController: req.file: ', req.file);
        console.log('[INFO:] avatar 更新地址', avatar);
        await UserService.upload({
            userId: payload.userId,
            username,
            introduction,
            gender: Number(gender),
            avatar
        });
        res.send({
            ActionType:"OK",
            data:{
                username, introduction, 
                gender:Number(gender),
                avatar
            }
        })
    },
};

module.exports = UserController;
