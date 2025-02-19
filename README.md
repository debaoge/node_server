-----------need to -----------------

npm i --save express (下载服务器)
express serve
npm i axios
npm i mongoose --save
npm install -g mongo-express 可视化图形界面 复杂注册 未成功
npm i jsonwebtoken
npm i multer --save  后端 处理表单数据

brew install mongosh (未成功)

----------- 说明 ------------

1. 开后端服务器: server:/npm start  然后检查 localhost:3000/users
2. 开前端服务器: admin:/npm run serve 
3. 数据库: brew services list

----------- mongo db -----------
不需要node 环境
如果exception: connect failed
1.
mongod --dbpath --logpath /tmp/mongod.log --fork --verbose
mongo
退出:
sudo systemctl stop mongo

或者:
brew services list 检查 数据库 是否 运行
brew services restart mongodb-community@4.4
mongo 可以进入 数据库 页面 显示mongo MongoDB shell version v4.4.29
use mydatabase (使用或新建数据库 mydatabase) 

db.users.insertOne({   username: "admin", avatar:"avatar",   password: "a", role:"1", gender:1,introduction:"资深媒体人,公司总经理", createdAt: new Date() })
{
	"acknowledged" : true,
	"insertedId" : ObjectId("67af0e03dcdf50b25d1214e6")
}       
