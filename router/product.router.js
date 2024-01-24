const {Router}=require("express")
const verifyToken=require("../middleware/isauth")
const isAdmin = require("../middleware/admin")
const{create,createBy,productpage,admin,getuser, shop, carts, cartfind,getcart,updatecart, payment, home, allproduct, filltercategory, pricefilter}=require("../controllers/product.controllers")
const route=Router()

route.get("/home",verifyToken,home)
route.get("/shop",verifyToken,shop)
route.get("/",create)
route.post("/productpage",isAdmin,createBy)
route.get("/productpage",isAdmin,productpage)

route.get("/admin",isAdmin,admin)
route.get("/getuser",isAdmin,getuser)


route.post("/cart",verifyToken,carts)
route.get("/cart",getcart)
route.get("/cartfind",verifyToken,cartfind)
route.patch("/cart/update/:id",verifyToken,updatecart)
route.get("/allproduct",allproduct)
route.get("/filter",filltercategory)
route.get("/sort",pricefilter)

route.post("/payment",payment)



module.exports=route