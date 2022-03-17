const jwt = require("jsonwebtoken");

let MDwear = (req, res, next) => {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(401)
        .send({ status: false, msg: "token must be present" });
    }

    let decodedToken = jwt.verify(token, "project-blog");

    // jwt.verify(token, "project-blog");
    console.log(decodedToken.authorId);
    console.log(req.query.authorId);
    if (decodedToken.authorId !== req.query.authorId) {
      return res.status(401).send({ msg: "you must have to login first" });
    }
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.MDwear = MDwear;
