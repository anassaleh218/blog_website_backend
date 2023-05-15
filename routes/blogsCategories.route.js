const express = require("express");
const route = express.Router();
const Categories = require("../models/blogsCategories.model");

route.get("/", async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.json({
            status: true,
            message:categories,
          });
        } catch (err) {
          res.status(404).json({
            status: false,
            message: err,
          });
        }
});

route.get("/:id", async (req, res) => {
    try {
        const category = await Categories.findAll({
            where: {
                id: req.params.id,
            }
        });
        res.json({
            status: true,
            message:category,
          });
        } catch (err) {
          res.status(404).json({
            status: false,
            message: err,
          });
        }
});

route.post("/", async (req, res) => {
    try {
        const newCategories = await Categories.create({
            name: req.body.name,
        });
        res.json({
            status: true,
            message:newCategories,
          });
        } catch (err) {
          res.status(404).json({
            status: false,
            message: err,
          });
        }
});

route.patch("/:id", async (req, res) => {
    try {
        const editCategories = await Categories.update({
            name: req.body.name,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            status: true,
            message:"edited successfully",
          });
        } catch (err) {
          res.status(404).json({
            status: false,
            message: err,
          });
        }
});


route.delete("/:id", async (req, res) => {
    try {
        await Categories.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({
            status: true,
            message:"deleted successfully",
          });
        } catch (err) {
          res.status(404).json({
            status: false,
            message: err,
          });
        }

});


module.exports = route;