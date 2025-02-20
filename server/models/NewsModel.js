const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NewsType = {
    title: String, 
    content: String, 
    category:Number,//1 
    cover:String, //可以换像
    isPublish:Number,
    editTime:Date 
}

const NewsModel = mongoose.model("news", new Schema(NewsType))
module.exports = NewsModel