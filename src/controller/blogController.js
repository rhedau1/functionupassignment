
const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const { find, count } = require("../models/blogModel")
// const { send } = require("express/lib/response")

//CREATEBLOG-
const createBlog = async function (req, res) {
    try {
        let authorId = req.body.authorId
        let data = req.body

        if (!authorId) return res.send('The request is not valid as the author details are required.')

        let author = await authorModel.findById(authorId)
        if (!author) return res.send('The request is not valid as no author is present with  given author id')

        let createdBlog = await blogModel.create(data)
        res.send({ data: createdBlog })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//GETBLOG-

const getblogs = async function (req, res) {


    try {
          {

            if (req.query.category || req.query.authorId || req.query.tags || req.query.subcategory) {
                let obj = {};
                if (req.query.category) {
                    obj.category = req.query.category
                }
                if (req.query.authorId) {
                    obj.authorId = req.query.authorId;
                }
                if (req.query.tags) {
                    obj.tags = req.query.tags
                }
                if (req.query.subcategory) {
                    obj.subcategory = req.query.subcategory
                }
                obj.isDeleted = false
                obj.isPublished = true
                let data = await blogModel.find(obj)
               
                if (data == false) {
                    return res.status(404).send({ status: false, msg: "The filter value is Invalid" });
                } else {
                    res.status(200).send({ status: true, message: "Successfully fetched all blogs", data: data, count: data.length })
                }
            } else {

                
                    let allBlogs = await blogModel.find({ isPublished: true }, { isDeleted: false })
                    //  console.log(allBlogs)
                    // res.send({  })
                
                return res.status(404).send({ data: allBlogs, count: allBlogs.length })
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//UPDATEBLOG-

const updateBlog = async function (req, res) {

    try {
        let blogId = req.params.blogId;
        let blog = await blogModel.findById(blogId);

        if (!blog) {
            return res.status(404).send({ status: false, msg: "No such blog exists" });
        }
        console.log(req.body.subcategory)

        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, {
            title: req.body.title, body: req.body.body, tags: req.body.tags, isPublished: true,
            publishedAt: Date.now(), subcategory: req.body.subcategory, category: req.body.category
        }, { new: true })
        console.log(updatedBlog)
        res.status(200).send({ status: true, data: updatedBlog });
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//DELETEBLOG-

const deleteUser = async function (req, res) {

    try {
        let blogId = req.params.blogId;
        let blog = await blogModel.findById(blogId);

        if (!blog) {
            res.status(401).send("No such blog exists");
        }
        let is_Deleted = Object.keys(blog).find(isDeleted => blog[isDeleted] === true)
        if (is_Deleted == true) return res.status(404).send({ status: false, msg: "Blog is already deleted" })

        let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } }, {new:true});
        // let deletedBlog = await blogModel.updateOne({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } });
        console.log(deletedBlog)
        return res.status(201).send({ status: true, data: deletedBlog });
    }

    catch (err) { res.status(500).send({ msg: "Error", error: err.message }) }
};


const deleteSpecificItem = async function (req, res) {
    try {
        const data = req.query

        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "No input provided" })

        const deleteBYquery = await blogModel.findOneAndUpdate(data, { isDeleted: true, deletedAt: new Date() }, { new: true })

        if (!deleteBYquery) return res.status(404).send({ status: false, msg: "no such blog found" })
        res.status(200).send({ status: true, msg: deleteBYquery })
    }
    catch (err) {
        res.status(500).send({ status: false, message: "Something went wrong", Error: err });
    }
}

module.exports.updateBlog = updateBlog
module.exports.deleteSpecificItem = deleteSpecificItem
module.exports.createBlog = createBlog
module.exports.getblogs = getblogs
module.exports.deleteUser = deleteUser// const blogModel = require("../models/blogModel");
// const authorModel = require("../models/authorModel");
// const { send } = require("express/lib/response");
// const jwt = require("jsonwebtoken");

// //CREATEBLOG-

// const createBlog = async function (req, res) {
//   try {
//       let authorId = req.body.authorId
//       let data = req.body

//       if (!authorId) return res.send('The request is not valid as the author details are required.')

//       let author = await authorModel.findById(authorId)
//       if (!author) return res.send('The request is not valid as no author is present with  given author id')

//       let createdBlog = await blogModel.create(data)
//       res.send({ data: createdBlog })
//   }
//   catch (err) {
//       console.log(err)
//       res.status(500).send({ msg: err.message })
//   }
// }


// //GETBLOG-

// const getblogs = async function (req, res) {
//   try {
//     if (
//       req.query.category ||
//       req.query.authorId ||
//       req.query.tags ||
//       req.query.subcategory
//     ) {
//       let obj = {};
//       if (req.query.category) {
//         obj.category = req.query.category;
//       }
//       if (req.query.authorId) {
//         obj.authorId = req.query.authorId;
//       }
//       if (req.query.tags) {
//         obj.tags = req.query.tags;
//       }
//       if (req.query.subcategory) {
//         obj.subcategory = req.query.subcategory;
//       }
//       obj.isDeleted = false;
//       obj.isPublished = true;
//       let data = await blogModel.find(obj);
//       if (data == false) {
//         return res
//           .status(404)
//           .send({ status: false, msg: "The filter value is Invalid" });
//       } else {
//         res.status(200).send({
//           status: true,
//           message: "Successfully fetched all blogs",
//           data: data,
//         });
//       }
//     } else {
//       return res
//         .status(404)
//         .send({ status: false, msg: "Mandatory filter not given" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ msg: err.message });
//   }
// };

// //UPDATEBLOG-

// const updateBlog = async function (req, res) {
//   try {
//     let blogId = req.query.blogId;
//     let blog = await blogModel.findById(blogId);

//     if (!blog) {
//       return res
//         .status(404)
//         .send({ status: false, msg: "No such blog exists" });
//     }
//     let updatedBlog = await blogModel.updateMany(
//       { _id: blogId },
//       {
//         title: req.body.title,
//         body: req.body.body,
//         tags: req.body.tags,
//         isPublished: true,
//         publishedAt: Date.now(),
//         subCategory: req.body.subcategory,
//       },
//       { new: true }
//     );

//     res.status(200).send({ status: true, data: updatedBlog });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ msg: err.message });
//   }
// };

// //DeleteBlog

// const deleteSpecificItem = async function (req, res) {
//   try {
//     const data = req.query;
//     if (Object.keys(data) == 0)
//       return res.status(400).send({ status: false, msg: "No input provided" });
//     const deleteBYquery = await blogModel.updateOne(
//       data,
//       { isDeleted: true, deletedAt: new Date() },
//       { new: true }
//     );
//     if (!deleteBYquery)
//       return res.status(404).send({ status: false, msg: "no such blog found" });
//     res.status(200).send({ status: true, msg: deleteBYquery });
//   } catch (err) {
//     res
//       .status(500)
//       .send({ status: false, message: "Something went wrong", Error: err });
//   }
// };

// module.exports.updateBlog = updateBlog;
// module.exports.deleteSpecificItem = deleteSpecificItem;
// module.exports.createBlog = createBlog;
// module.exports.getblogs = getblogs;
