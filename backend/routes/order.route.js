const { Router } = require("express");
const { OrderModel } = require("../models/order.model");

const orderRouter = Router();

orderRouter.get("/", async (req, res) => {
    let { userID } = req.body;
    let data = await OrderModel.find({ userID });
    res.status(200).send(data);
})

orderRouter.post("/add", async (req, res) => {
    try {
        let order = new OrderModel(req.body);
        await order.save();
        res.status(200).send({ "msg": "data updated successfully", "data": order });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})

orderRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params
    try {
        await OrderModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({ "msg": "order updated successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})

orderRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params
    try {
        await OrderModel.findByIdAndDelete(id);
        res.status(200).send({ "msg": "order deleted successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})