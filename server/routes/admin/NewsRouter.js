const express = require('express');
const NewsRouter = express.Router();

const NewsController = require('../../controllers/admin/NewsController');

const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

NewsRouter.post("/news/add", upload.single('cover'), NewsController.add)

NewsRouter.get("/news/list", NewsController.getList)
NewsRouter.get("/news/list/:id", NewsController.getList)

NewsRouter.put("/news/list/:id", NewsController.putList)

NewsRouter.put("/news/publish", NewsController.publish)

NewsRouter.delete("/news/list/:id", NewsController.delList)

module.exports = NewsRouter;