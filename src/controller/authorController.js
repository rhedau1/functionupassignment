const AuthorModel = require("../models/authorModel");
const emailValidator = require("express-validator");
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {
  try {
    let author = req.body;
    const { email } = req.body; //  destructuring

    const verifyEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      author.email
    )
      ? true
      : false;

    if (!verifyEmail) {
      return res.status(400).send({ msg: "email not valid" });
    } else {
      let authorCreated = await AuthorModel.create(author);
      res.status(200).send({ data: authorCreated });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

// const loginAuthor = async function (req, res) {
//     let authorEmail = req.body.email;
//     let password = req.body.password;

//     let author = await AuthorModel.findOne({ email: authorEmail, password: password });
//     if (!author)
//         return res.send({ status: false, msg: "username or the password is not correct" });

// //sending token with succesfull login-
//     let token = jwt.sign(
//         {
//             authorId: author._id.toString()
//         },
//         "project-blog"
//     );
//     res.setHeader("x-api-key", token);
//     res.send({ status: true, data: token });
// };

const loginUser = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const author = await AuthorModel.findOne({
      email: userEmail,
      password: userPassword,
    });
    //   console.log(author._doc)
    if (!author) {
      return res.send({
        status: false,
        msg: "please enter a valid emailId or password",
      });
    }
    // else{
    //     const token = jwt.sign({authorId: author._id.toString()},"project-blog")
    // }

    //   console.log(token)
    const token = jwt.sign(
      {
        authorId: author._id.toString(),
      },
      "project-blog"
    );
    res.setHeader("x-api-key", token);
    res.send({ status: true, data: token });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "Something went wrong", Error: err });
  }
};

module.exports.loginUser = loginUser;
// module.exports.loginAuthor = loginAuthor
module.exports.createAuthor = createAuthor;
