-----------need to -----------------

npm i --save express (下载服务器)
express serve
npm i axios
npm i mongoose --save
npm install -g mongo-express 可视化图形界面 复杂注册 未成功
npm i jsonwebtoken

brew install mongosh (未成功)

----------- 说明 ------------

1. 开后端服务器: server:/npm start  然后检查 localhost:3000/users
2. 开前端服务器: admin:/npm run serve 
3. 数据库: brew services list

----------- mongo db -----------
不需要node 环境
如果exception: connect failed

rm /db/WiredTiger.lock
rm -rf /db
mkdir -p /db
chmod -R 755 /db

brew services list 检查 数据库 是否 运行
brew services restart mongodb-community@4.4
mongo 可以进入 数据库 页面 显示mongo MongoDB shell version v4.4.29
use mydatabase (使用或新建数据库 mydatabase) 

login : admin a
        aaa   a
        
