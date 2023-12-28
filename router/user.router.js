const {Router}=require("express")
const {signup,usersignup,login,userlogin,users,reset,verify,uploadfile,image,img}=require("../controllers/user.controllers")
const verifyToken = require("../middleware/isauth")
const router=Router()

router.post("/signup",signup)
router.get("/signup",usersignup)
router.post("/login",login)
router.get("/login",userlogin)
router.get("/users",verifyToken,users)
router.get("/verify/:otps",verify)
router.post("/reset",reset)
router.post("/img/upload",verifyToken,uploadfile,image)
router.get("/profile",verifyToken,img)


module.exports=router