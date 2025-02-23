const NewsModel = require("../../models/NewsModel");

const NewsService = {
    
    getList: async ({ id }) => {
        return id ? NewsModel.find({ _id: id, isPublish:1 }, ["title", "content", "category", "cover", "isPublish", "editTime"])
            : NewsModel.find({isPublish:1}, ["title", "content", "category", "cover", "isPublish", "editTime"])
            .sort({editTime:-1})
    },
};

module.exports = NewsService;