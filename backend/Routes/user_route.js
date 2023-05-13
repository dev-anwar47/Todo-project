const router = require('express').Router();
const { findByIdAndDelete, findOneAndDelete } = require('../Models/user_model');
const User = require('../Models/user_model');

router.post("/api/item", async (req, res) => {
    try {
        const newItem = await new User({
            item: req.body.item
        })
        const saveItem = await newItem.save();
        res.status(200).json(saveItem)
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

router.get("/api/items", async (req, res) => {
    try {
        const allTodoItems = await User.find({});
        res.status(200).json(allTodoItems)

    } catch (err) {
        res.json(err)
    }
})

router.put("/api/item/:id", async (req, res) => {
    try {
        const updateItem = await User.findOneAndUpdate(req.body.id, { $set: req.body })
        res.status(200).json('Item Updated Sucessfully')
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete("/api/item/:id", async (req, res) => {
    try {
        const deleteItem = await User.findOneAndDelete(req.body.id, { $set: req.body })
        res.status(200).json('Item Deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;