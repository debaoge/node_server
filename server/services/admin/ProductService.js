const ProductModel = require("../../models/ProductModel");

const ProductService = {

    add: async ({ title, content, describe, cover, editTime }) => {
        console.log('[INFO: ] ProductService add 参数: ', { title, content, describe, cover, editTime });
        let result = null;

        if (cover) {
            result = await ProductModel.create({
                title,
                content,
                describe,
                cover,
                editTime
            });
        } else {
            result = await ProductModel.create({
                title,
                content,
                describe,
                editTime
            });
        }
        console.log('[INFO:] ProductService 加入结果: ', result);
        // 检查更新结果
        if (!result) {
            console.log('[INFO:] 产品添加失败');
            throw new Error('产品添加失败');
        }
        console.log('[INFO:] 产品信息已成功添加');
        return {
            ActionType: 'OK',
            data: {
                title,
                content,
                describe,
                cover,
                editTime
            },
        };
    },

    getList: async ({ id }) => {
        return id ? ProductModel.find({ _id: id }, ["title", "content", "describe", "cover","editTime"])
            : ProductModel.find()
    },

    delList: async ({ _id }) => {
        return ProductModel.deleteOne({ _id })
    },

    putList: async (body) => {
        const result = ProductModel.updateOne({ _id: body._id }, { body })
        console.log('[INFO: ] 产品更新后 数据库: ', result);
        return result
    },
};

module.exports = ProductService;