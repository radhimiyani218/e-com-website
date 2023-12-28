const user = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpgenerate = require("otp-generator");
const multer=require("multer")
const verifyToken = require("../middleware/isauth");
const path=require("../middleware/helper")

//  signup
const signup = async (req, res) => {
  let data = await user.findOne({ email: req.body.email });
  if (data) {
    return res.send({ message: "already exists" });
  } else {
    let { username, email, password ,role} = req.body;
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ message: "valid" });
      } else {
        let obj = {
          username: username,
          password: hash,
          email: email,
          role:role
        };
        let data = await user.create(obj);
        res.send({ message: "valid", val: data });
      }
    });
  }
};
const usersignup = (req, res) => {
  res.render("signup");
};

// login
const login = async(req,res)=>{
  const { email, password } = req.body;
  let data = await user.findOne({ email });
  if (data) {
      bcrypt.compare(password, data.password, (err, result) => {
          if (result) {
              let token = jwt.sign({ id: data._id, role: data.role }, "token");
              res.cookie("token", token).send({ msg: "User login successfully" });
          } else {
              res.send({ msg: "Password incorrect" });
          }
      });
  } else {
      res.send({ msg: "User not found" });
  }
}

const userlogin = (req, res) => {
  res.render("login");
};

// user

const users = async (req, res) => {
  // console.log(req.user);
  res.send({ msg: "cheking token" });
};

// nodemailer

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "radhimiyani218@gmail.com",
    pass: "bdkykxzoyrpxkfab",
  },
});
const email = async (req, res) => {
  res.render("email");
};

// otp

const reset = async (req, res) => {
  let { email } = req.body;

  otp = otpgenerate.generate(6, {
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });

  const mail = {
    from: "radhimiyani218@gmail.com",
    to: email,
    subject: "forgot password ",
    html: `<a href=http://localhost:8090/user/verify/${otp}>verify your otp ${otp}</a>`,
  };
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(info);
    }
  });

  res.send(mail);
};

const verify = async (req, res) => {
  let { token } = req.params;

  if (token == otp) {
    res.send("Verify sucessfully");
  } else {
    res.send(" verify not sucessfully");
  }
};

const store = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
})

const uploadfile = multer({
  storage: store
}).single("img")

const image = async (req, res) => {
  let path = path()
  path += `/${req.file.path}`
  let User = await user.findById(req.user.id)
  User.img = path
  console.log(path);
  await user.save()
  res.send(user)
}

const img = (req, res) => {
  res.render("img")
}

module.exports = {
  signup,
  login,
  userlogin,
  usersignup,
  users,
  reset,
  email,
  verify,
  img,image,uploadfile
};
