const NewsModel = require("../../models/NewsModel");

const NewsService = {
  getList: async ({ _id }) => {
    return _id
      ? NewsModel.find({ _id, isPublish: 1 }, ["title", "content", "category", "cover", "isPublish", "editTime"])
      : NewsModel.find({ isPublish: 1 }, ["title", "content", "category", "cover", "isPublish", "editTime"]).sort({ editTime: -1 });
  },

  getTopList: async ({ limit }) => {
    return NewsModel.find({ isPublish: 1 }, ["title", "content", "category", "cover", "isPublish", "editTime"])
      .sort({ editTime: -1 }).limit(limit);
  },
};


module.exports = NewsService;