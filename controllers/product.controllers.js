const product=require("../models/product.schema")
const cart=require("../models/cart.schema")
const Razorpay = require("razorpay")

const create=async(req,res)=>{
    try{
        let data=await product.find()
        res.send(data)
    }
    catch(error){
        res.status(404).send(error.message)
    }
}

const createBy=async(req,res)=>{
    req.body.createBy=req.user.id
    let data =await product.create(req.body)
    res.send(data)
}

// admin

const admin=async(req,res)=>{
    let data=await product.find({createBy:req.user.id})
    res.send(data)
}

const shop=async(req,res)=>{
    res.render("shop")
}

const productpage=async(req,res)=>{
    res.render("productpage")
}

const getuser=async(req,res)=>{
    res.render("users")
}
const home=async(req,res)=>{
    res.render("home")
}

// cart
const carts=async(req,res)=>{
    let userID=req.user.id;
    req.body.userID=userID;
    
    let data=await cart.create(req.body)
    console.log(data);
    res.send(data)
}
const cartfind=async(req,res)=>{
    console.log(req.user);
    let data=await cart.find({userID:req.user.id}).populate("productID")
    res.send(data)
    console.log(data,"cart");
}
const getcart=async(req,res)=>{
    res.render("cart")
}
const updatecart=async(req,res)=>{
    let {qty}=req.body
    let {id}=req.params
     let data=await cart.findById(id)
     data.qty=data.qty+qty
     await data.save()
     if(data.qty==0){
        await cart.findByIdAndDelete(id)
     }
     res.send({update:data})
}

const allproduct = async(req,res) =>{
    // const {id} = req.body
    try {
        let data = await product.find()
        res.send(data)
    } 
    catch (error) {
        res.send({ msg: error })
    }
}


const filltercategory = async (req, res) => {
    const { category } = req.query

    console.log(category);
    try {
        let data = await product.find({ category })
        res.send(data)
    }
    catch (error) {
        res.send({ msg: error })
    }
}

const pricefilter = async (req, res) => {
    const { sort } = req.query
    if (sort == "lth") {
        const data = await product.find().sort({ price: 1 })
        res.send(data)
    }

    else if (sort == "htl") {
        const data = await product.find().sort({ price: -1 })
        res.send(data)
    }
}
let razorpay = new Razorpay({
    key_id: "rzp_test_K5oH0ht3uj6cTB",
    key_secret:"cdTVpD4jbzmOmTFv6vkoSomE"
})

const payment = (req, res) => {
    let options = {
        amount: req.body.amount * 100,
        currency: "INR"
    }
    razorpay.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
            res.send({ status: err })
        }
        else {
            res.send(order)
        }
    })
}

module.exports={home,create,createBy,productpage,admin,getuser,shop,carts,cartfind,getcart,updatecart,payment,allproduct,pricefilter,filltercategory}