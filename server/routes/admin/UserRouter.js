const express = require('express');
const UserRouter = express.Router();
const UserController = require('../../controllers/admin/UserController');

// Correct route path and function reference
UserRouter.post("/user/login", UserController.login);
UserRouter.get("/user/home", (req, res)=>{
    res.send({ok:1})
})

module.exports = UserRouter;