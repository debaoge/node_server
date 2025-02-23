const express = require('express');
const ProductRouter = express.Router();

const ProductController = require('../../controllers/web/ProductController');

const multer = require('multer')
const upload = multer({dest:'public/productuploads/'})

ProductRouter.post("/product/add",upload.single('cover'), ProductController.add)

ProductRouter.get("/product/list", ProductController.getList)
ProductRouter.get("/product/list/:id", ProductController.getList)
ProductRouter.put("/product/list/:id", ProductController.putList)
ProductRouter.delete("/product/list/:id", ProductController.delList)

module.exports = ProductRouter;