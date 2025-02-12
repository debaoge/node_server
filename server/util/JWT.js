const jsonwebtoken = require("jsonwebtoken");

const secret = "kerwin";

const JWT = {

  generate(value, expires) {
    return jsonwebtoken.sign(value, secret, { expiresIn: expires });
  },

  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error("JWT 验证失败: Token 已过期");
      } else {
        console.error("JWT 验证失败:", error.message);
      }
      return null;
    }
  },
};

// 测试代码 运行 npm start 测试结果直接出现在终端
// const testJWT = () => {
//   const token = JWT.generate({ name: "kerwin" }, "10s");
//   console.log("生成的 token:", token);

//   // 立即验证 token（应成功）
//   const decodedPayload = JWT.verify(token);
//   console.log("验证结果（立即）:", decodedPayload);

//   // 11 秒后验证 token（应失败）
//   setTimeout(() => {
//     const expiredPayload = JWT.verify(token);
//     console.log("验证结果（11 秒后）:", expiredPayload);
//   }, 11000);
// };

// 运行测试
// testJWT();

/**
 * 生成的 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2Vyd2luIiwiaWF0IjoxNzM5MzU4NjY2LCJleHAiOjE3MzkzNTg2NzZ9.skraJlE9_0qTTv7XOR_eWN_vDTlOVNA3kPBDNDJuy2Y
验证结果（立即）: { name: 'kerwin', iat: 1739358666, exp: 1739358676 }
Server is running on http://localhost:3001
JWT 验证失败: jwt expired
验证结果（11 秒后）: null
 */

module.exports = JWT;