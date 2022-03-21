
const express= require("express")
const router = express.Router()
const authorController=require ("../controller/authorController")
const blogController=require ("../controller/blogController")
const middleWare=require ("../middleware/middleware")


// author creation
router.post ("/authors",authorController.createAuthor)
// author login
router.post("/authorLogin",authorController.authorLogin)
// blog creation
router.post ("/blog",middleWare.authentication,blogController.createBlog)
// get blogs 
router.get("/getBlogsData",middleWare.authentication,blogController.getblogs)
// update blog
router.put("/updateBlogsData/blogs/:blogId",middleWare.authentication,middleWare.authorization, blogController.updateBlog)
// delete blog
router.delete("/deleteBlog/blogs/:blogId",middleWare.authentication,middleWare.authorization,blogController.deleteUser)

router.delete("/deleteSpecific",middleWare.authentication,middleWare.authorization,blogController.deleteSpecificItem)

module.exports=router;// const express = require("express");
// const router = express.Router();
// // const app = express();
// const AU = require("../controller/authorController");
// const BU = require("../controller/blogController");
// const { emailValidator, check } = require("express-validator");
// const Middleware = require("../middleware/authentication");

// router.post("/authors", AU.createAuthor);
// router.post("/blog", Middleware.MDwear, BU.createBlog);
// router.get("/getBlogsData", Middleware.MDwear, BU.getblogs);
// router.put("/updateBlogsData", Middleware.MDwear, BU.updateBlog);
// router.delete("/deleteBlog", Middleware.MDwear, BU.deleteSpecificItem);
// router.post("/loginUser", AU.loginUser);

// module.exports = router;
