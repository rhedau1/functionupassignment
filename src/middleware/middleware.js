const blogModel = require("../models/blogModel")
const jwt = require("jsonwebtoken");


const authentication=async function (req,res,next) {
    try{
        let token=req.headers["x-api-key"];
        if(!token){
            return res.send("token is not present")
        }
        else {
            let decodedtoken= jwt.verify(token, "First project")
            console.log(decodedtoken.authorId)
            if (!decodedtoken) return res.status(401).send({status: false, msg: "token is invalid"})
            next();
        }

    }catch(err){
        return res.status(500).send(err.message)
    }
  }

const authorization=async function (req,res,next) {
    try{

        let token = req.headers['x-auth-token'];
        if(!token){
            return res.status(404).send("token is not correct");
        }
        let pId= req.params.blogId
        let blog= await blogModel.find({_id:pId }).select({authorId: 1, _id :0})
        let updateId= blog.map(a=> a.authorId)
        console.log(updateId.toString())

        let decodeToken = jwt.verify(token,"First project")
        // let aID= req.query.authorId;
        let dID = decodeToken.authorId;
        if(updateId.toString() != dID){
            return res.status(402).send("author not allowed")
        }
        else{
            next();
        }
    }catch(err){
        return res.status(500).send({msg:err.message})
    }
  }

  module.exports.authentication=authentication;
  module.exports.authorization=authorization

// const jwt = require("jsonwebtoken");

// let MDwear = (req, res, next) => {
//   try {
//     let token = req.headers["x-api-key"];
//     if (!token) {
//       return res
//         .status(401)
//         .send({ status: false, msg: "token must be present" });
//     }

//     let decodedToken = jwt.verify(token, "project-blog");

//     // jwt.verify(token, "project-blog");
//     console.log(decodedToken.authorId);
//     console.log(req.query.authorId);
//     if (decodedToken.authorId !== req.query.authorId) {
//       return res.status(401).send({ msg: "you must have to login first" });
//     }
//     next();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// module.exports.MDwear = MDwear;
