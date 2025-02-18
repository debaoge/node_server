const UserModel = require("../../models/UserModel");

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.find({
      username,
      password,
    });
  },
  upload: async ({ userId, username, introduction, gender, avatar }) => {
    console.log('[INFO: ] UserService upload 参数: ', { userId, username, introduction, gender, avatar });
    let result = null;
    // 更新用户信息
    if (avatar) {
      result = await UserModel.updateOne(
        { _id: userId },
        { username, introduction, gender, avatar }
      );

    } else {
      result = await UserModel.updateOne(
        { _id: userId },
        { username, introduction, gender }
      );
    }

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
  },


  add: async ({ username, password, role, introduction, gender, avatar }) => {
    console.log('[INFO: ] UserService add 参数: ', { username, password, role, introduction, gender, avatar });
    let result = null;

    // 添加用户信息
    if (avatar) {
      result = await UserModel.create({
        username,
        password,
        role,
        introduction,
        gender,
        avatar,
      });
    } else {
      result = await UserModel.create({
        username,
        password,
        role,
        introduction,
        gender,
      });
    }

    console.log('[INFO:] 加入结果: ', result);

    // 检查更新结果
    if (!result) {
      console.log('[INFO:] 添加用户失败');
      throw new Error('添加用户失败');
    }
    console.log('[INFO:] 用户信息已成功添加');

    // 返回包含 ActionType 和 data 的对象
    return {
      ActionType: 'OK',
      data: {
        username,
        password,
        role,
        introduction,
        gender,
        avatar,
      },
    };
  },

  getList: async ({id}) => { 
    return id ? UserModel.find({_id:id},["username","role","introduction","gender", "password"]) 
              : UserModel.find({},["username","role","introduction","gender","avatar"])},

  delList: async ({_id}) => {
    return UserModel.deleteOne({_id})
  },

  putList: async (body) => {
    return UserModel.updateOne({_id: body._id}, body)
  },

};

module.exports = UserService;