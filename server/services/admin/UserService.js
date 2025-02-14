const UserModel = require("../../models/UserModel");

const UserService = {
    login: async ({ username, password }) => {
        return UserModel.find({
            username,
            password,
        });
    },
    upload: async ({ userId, username, introduction, gender, avatar }) => {
        console.log('[INFO: ] UserService 参数: ', { userId, username, introduction, gender, avatar });

        // 更新用户信息
        const result = await UserModel.updateOne(
            { _id: userId },
            { username, introduction, gender, avatar }
        );
        console.log('[INFO:] 更新结果: ', result);

        // 检查更新结果
        if (result.matchedCount === 0) {
            console.log("[INFO:] 未找到匹配的用户");
            throw new Error("未找到匹配的用户");
        } else if (result.modifiedCount === 0) {
            console.log("[INFO:] 用户信息未更改");
        } else {
            console.log("[INFO:] 用户信息已成功更新");
        }

        // 查询更新后的用户信息
        const updatedUser = await UserModel.findOne({ _id: userId });
        console.log('[INFO:] 检查更新结果: ', updatedUser);

        // 返回更新后的用户信息
        return result;
    }
};

module.exports = UserService;