const NewsModel = require("../../models/NewsModel");

const NewsService = {

    add: async ({ title, content, category, isPublish, cover, editTime }) => {
        console.log('[INFO: ] NewsService add 参数: ', { title, content, category, isPublish, cover, editTime });
        let result = null;

        if (cover) {
            result = await NewsModel.create({
                title,
                content,
                category,
                isPublish,
                cover,
                editTime
            });
        } else {
            result = await NewsModel.create({
                title,
                content,
                category,
                isPublish,
                editTime
            });
        }

        console.log('[INFO:] NewsService 加入结果: ', result);

        // 检查更新结果
        if (!result) {
            console.log('[INFO:] 添加新闻失败');
            throw new Error('添加新闻失败');
        }
        console.log('[INFO:] 新闻信息已成功添加');

        // // 返回包含 ActionType 和 data 的对象
        return {
            ActionType: 'OK',
            data: {
                title,
                content,
                category,
                isPublish,
                cover,
                editTime
            },
        };
    },

    getList: async ({ id }) => {
        return id ? NewsModel.find({ _id: id }, ["title", "content", "category", "cover", "isPublish", "editTime"])
            : NewsModel.find({}, ["title", "content", "category", "cover", "isPublish", "editTime"])
    },

    delList: async ({ _id }) => {
        return NewsModel.deleteOne({ _id })
    },

    //   putList: async (body) => {
    //     return NewsModel.updateOne({_id: body._id}, body)
    //   },

    publish: async ({ _id, isPublish, editTime }) => {
        return NewsModel.updateOne({ _id }, { isPublish, editTime })
    },

};

module.exports = NewsService;