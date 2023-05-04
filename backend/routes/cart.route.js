const { Router } = require("express");
const { CartModel } = require("../models/cart.model");

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
    let {userID} = req.body;
    let data = await CartModel.find({ userID });
    res.status(200).send(data);
})

cartRouter.post("/add", async (req, res) => {
    try {
        let cart = new CartModel(req.body);
        await cart.save();
        res.status(200).send({"msg":"data updated successfully","data":cart});
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

cartRouter.patch("/update/:id",async(req,res)=>{
    let {id} = req.params
    try {
        await CartModel.findByIdAndUpdate(id,req.body);
        res.status(200).send({"msg":"cart updated successfully"});
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

cartRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params
    try {
        await CartModel.findByIdAndDelete(id);
        res.status(200).send({ "msg": "cart deleted successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})