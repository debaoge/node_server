const { error } = require("console");
const JWT = require("../../util/JWT");

const NewsService = require("../../services/admin/NewsService");
const multer = require("multer");
const upload = multer({ dest: 'public/newsuploads/' })

const NewsController = {
    
    add: async (req, res) => {
        // console.log('[INFO:] NewsController add news: req.file: ', req.file);
        const { title, content, category, isPublish } = req.body
        const cover = req.file ? `/avataruploads/${req.file.filename}` : ''

        await NewsService.add({
            title, 
            content, 
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime:new Date()
        });
        res.send({
            ActionType: "OK",
            data: {
                title, content, category: Number(category), isPublish: Number(isPublish),cover
            }
        })
    },

    // getList: async (req, res) => {
    //     const result = await UserService.getList(req.params);
    //     res.send({
    //         ActionType: "OK",
    //         data: result
    //     })
    // },

    // delList: async (req, res) => {
    //     console.log('[INFO] UserController del list', req.params.id);
    //     const result = await UserService.delList({_id:req.params.id});
    //     res.send({
    //         ActionType: "OK",
    //     })
    // },

    // putList: async (req, res) => {
    //     console.log('[INFO] UserController put list', req.body);
    //     const result = await UserService.putList(req.body);
    //     res.send({
    //         ActionType: "OK",
    //     })
    // }
}

module.exports = NewsController;
