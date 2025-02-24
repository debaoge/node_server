const express = require('express');
const router = express.Router();

const NewsController = require('../../controllers/web/NewsController');

// router.get("/news/list", (req, res) => {
//     console.log("Request reached /webapi/news/list");
//     res.json({ message: "News list" });
//   });
  
router.get("/news/list", NewsController.getList)
router.get("/news/list/:id", NewsController.getList)
router.get("/news/toplist/", NewsController.getTopList)

module.exports = router;