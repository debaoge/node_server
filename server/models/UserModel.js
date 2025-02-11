const mongoose = require("mongoose")
const Schema = mongoose.Schema

//UserModel 和 数据库 表 user 对映

const userType = {
    username: String, 
    password: String, 
    gender:Number,//0, 1, 2
    introduction:String,
    avator:String, //可以换icon头像
    role:Number //管理员1， 编辑2 

}

const UserModel = mongoose.model("user", new Schema(userType))
module.exports = UserModel