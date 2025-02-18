const { error } = require("console");
const JWT = require("../../util/JWT");

const UserService = require("../../services/admin/UserService");
const multer = require("multer");
const upload = multer({ dest: 'public/avataruploads/' })

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
        // console.log("req.file:", req.file);
        // console.log("req.body:", req.body);

        if (!req.file) {
            return res.status(400).json({ message: "文件上传失败" });
        }
        const { username, introduction, gender } = req.body
        const token = req.headers["authorization"].split(" ")[1];
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        const payload = JWT.verify(token);

        await UserService.upload({
            userId: payload.userId,
            username,
            introduction,
            gender: Number(gender),
            avatar
        });
        res.send({
            ActionType: "OK",
            data: {
                username, introduction,
                gender: Number(gender),
                avatar
            }
        })
    },

    add: async (req, res) => {
        console.log('[INFO:] UserController add user: req.file: ', req.file);
        const { username, password, role, introduction, gender } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''

        await UserService.add({
            username, 
            password, 
            role: Number(role),
            introduction,
            gender: Number(gender),
            avatar
        });
        res.send({
            ActionType: "OK",
            data: {
                username, introduction, role, password,
                gender: Number(gender),
                avatar
            }
        })
    },

    getList: async (req, res) => {
        const result = await UserService.getList(req.params);
        res.send({
            ActionType: "OK",
            data: result
        })
    },

    delList: async (req, res) => {
        console.log('[INFO] UserController del list', req.params.id);
        const result = await UserService.delList({_id:req.params.id});
        res.send({
            ActionType: "OK",
        })
    },

    putList: async (req, res) => {
        console.log('[INFO] UserController put list', req.body);
        const result = await UserService.putList(req.body);
        res.send({
            ActionType: "OK",
        })
    }
}

module.exports = UserController;
