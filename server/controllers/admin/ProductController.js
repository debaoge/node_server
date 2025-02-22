
const ProductService = require("../../services/admin/ProductService");
const ProductController = {

    add: async (req, res) => {
        console.log('[INFO:] ProductController add product: req.file: ', req.file);
        const { title, content, describe } = req.body
        const cover = req.file ? `/productuploads/${req.file.filename}` : ''

        await ProductService.add({
            title, 
            content, 
            describe, 
            cover,
            editTime:new Date()
        });
        res.send({
            ActionType: "OK",
            data: {
                title, content, describe, cover
            }
        })
    },
    getList: async (req, res) => {
        const result = await ProductService.getList(req.params);
        res.send({
            ActionType: "OK",
            data: result
        })
    },

    delList: async (req, res) => {
        console.log('[INFO] ProductController del list', req.params.id);
        const result = await ProductService.delList({_id:req.params.id});
        res.send({
            ActionType: "OK",
        })
    },

    putList: async (req, res) => {
        console.log('[INFO] ProductController put list', req.body);
        await ProductService.putList({
            ...req.body,
            editTime: new Date()
        });
        res.send({
            ActionType: "OK",
        })
    },

}
module.exports = ProductController