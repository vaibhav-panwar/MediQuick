const { Router } = require("express");
const { CommentModel } = require("../models/comment.model");

const commentRouter = Router();

commentRouter.get("/", async (req, res) => {
    let { productID } = req.body;
    let data = await CommentModel.find({ productID });
    res.send(data)
})

commentRouter.post("/add", async (req, res) => {
    try {
        let comment = new CommentModel(req.body);
        await comment.save();
        res.status(200).send({ "msg": "new comment added" })
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
})
commentRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await CommentModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({ "msg": "comment updated successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

commentRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await CommentModel.findByIdAndDelete(id);
        res.status(200).send({ "msg": "comment deleted successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


module.exports = { commentRouter };