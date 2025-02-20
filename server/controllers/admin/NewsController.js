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

    getList: async (req, res) => {
        const result = await NewsService.getList(req.params);
        res.send({
            ActionType: "OK",
            data: result
        })
    },

    delList: async (req, res) => {
        console.log('[INFO] NewsController del list', req.params.id);
        const result = await NewsService.delList({_id:req.params.id});
        res.send({
            ActionType: "OK",
        })
    },

    putList: async (req, res) => {
        console.log('[INFO] NewsController put list', req.body);
        await NewsService.putList(req.body);
        res.send({
            ActionType: "OK",
        })
    },

    publish: async (req, res) => {
        console.log('[INFO] NewsController publish list', req.body);
        await NewsService.publish({
            ...req.body,
            editTime: new Date()
        });
        res.send({
            ActionType: "OK",
        })
    }
}

module.exports = NewsController;
