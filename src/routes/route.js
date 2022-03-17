const express = require("express");
const router = express.Router();
// const app = express();
const AU = require("../controller/authorController");
const BU = require("../controller/blogController");
const { emailValidator, check } = require("express-validator");
const Middleware = require("../middleware/authentication");

router.post("/authors", AU.createAuthor);
router.post("/blog", Middleware.MDwear, BU.createBlog);
router.get("/getBlogsData", Middleware.MDwear, BU.getblogs);
router.put("/updateBlogsData", Middleware.MDwear, BU.updateBlog);
router.delete("/deleteBlog", Middleware.MDwear, BU.deleteSpecificItem);
router.post("/loginUser", AU.loginUser);

module.exports = router;
