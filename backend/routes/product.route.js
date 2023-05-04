const { Router } = require("express");
const { ProductModel } = require("../models/Product.model");

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // default to page 1
        const limit = parseInt(req.query.limit) || 10; // default to limit of 10 products per page
        const skipIndex = (page - 1) * limit;
        const searchQuery = {};
        const sortField = {};
        if (req.query.sort) {
            let a = req.query.sort.split(" ");
            sortField[`${a[0]}`] = `${a[1]}`
        }
        if (req.query.category) {
            searchQuery.category = { $regex: req.query.category, $options: 'i' };
        }
        if (req.query.brand) {
            searchQuery.brand = { $regex: req.query.brand, $options: 'i' };
        }
        if (req.query.healthConcerns) {
            searchQuery.healthConcerns = { $regex: req.query.healthConcerns, $options: 'i' };
        }
        if (req.query.title) {
            searchQuery.title = { $regex: req.query.title, $options: 'i' };
        }

        const products = await ProductModel.find(searchQuery).sort(sortField).skip(skipIndex).limit(limit);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

productRouter.post("/add", async (req, res) => {
    try {
        let product = new ProductModel(req.body);
        await product.save();
        res.status(200).send({ "data": product, "msg": "product added successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

productRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await ProductModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({ "msg": "product updated successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

productRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await ProductModel.findByIdAndDelete(id);
        res.status(200).send({ "msg": "product deleted successfully" });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

module.exports = { productRouter };