var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const JWT = require("./util/JWT");
const UserRouter = require("./routes/admin/UserRouter");
const NewsRouter = require("./routes/admin/NewsRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 使用路由
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/adminapi",NewsRouter);
app.use("/adminapi", UserRouter);

// ✅ **全局 Token 认证中间件**
app.use((req, res, next) => {
    if (req.url === "/user/login") {
    return next();
  }

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errCode: "-1", errorInfo: "未提供 Token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token);
    
    if (!payload) {
      return res.status(401).json({ errCode: "-1", errorInfo: "Token 过期或无效" });
    }

      const newToken = JWT.generate({
          _id: payload._id,
          username: payload.username,
        },"1d");
      res.header("Authorization", `Bearer ${newToken}`);
      next();
    
  } catch (error) {
    console.error("Token 认证失败:", error.message);
    return res.status(401).json({ errCode: "-1", errorInfo: "Token 无效" });
  }
});

// **监听端口**
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 处理 404 错误
app.use((req, res, next) => {
  next(createError(404));
});

// 全局错误处理
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
