const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userType = {
    username: String, 
    password: String, 
    gender:Number,//0, 1, 2
    introduction:String,
    avator:String,
    role:Number //管理员1， 编辑2 

}

const UserModel = mongoose.model("user", new Schema(userType))
module.exports = UserModel