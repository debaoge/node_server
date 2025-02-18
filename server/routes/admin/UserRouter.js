const express = require('express');
const UserRouter = express.Router();
const UserController = require('../../controllers/admin/UserController');

const multer = require('multer')
const upload = multer({dest:'public/avataruploads/'})

// Correct route path and function reference
UserRouter.post("/user/login", UserController.login);
UserRouter.get("/user/home", (req, res)=>{
    res.send({ok:1})
})
UserRouter.post("/user/upload",upload.single('avatar'), UserController.upload)
UserRouter.post("/user/add",upload.single('avatar'), UserController.add)
UserRouter.get("/user/list", UserController.getList)
UserRouter.get("/user/list/:id", UserController.getList)

UserRouter.put("/user/list/:id", UserController.putList)
UserRouter.delete("/user/list/:id", UserController.delList)


module.exports = UserRouter;