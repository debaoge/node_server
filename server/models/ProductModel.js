const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductType = {
    title: String, 
    describe:String,
    content: String,
    cover:String,
    editTime:Date
}

const ProductModel = mongoose.model("product", new Schema(ProductType))
module.exports = ProductModel


