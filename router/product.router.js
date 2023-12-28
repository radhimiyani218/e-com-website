const {Router}=require("express")
const verifyToken=require("../middleware/isauth")
const isAdmin = require("../middleware/admin")
const{create,createBy,productpage,admin,getuser, home, carts, cartfind,getcart,updatecart, payment}=require("../controllers/product.controllers")
const route=Router()

route.get("/home",verifyToken,home)
route.get("/",create)
route.post("/productpage",isAdmin,createBy)
route.get("/productpage",isAdmin,productpage)

route.get("/admin",isAdmin,admin)
route.get("/getuser",isAdmin,getuser)


route.post("/cart",verifyToken,carts)
route.get("/cart",getcart)
route.get("/cartfind",verifyToken,cartfind)
route.patch("/cart/update/:id",verifyToken,updatecart)

route.post("/payment",payment)
module.exports=route