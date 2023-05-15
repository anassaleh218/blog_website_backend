const express = require("express");
const route = express.Router();
const Blogs = require("../models/blogs.model");

const upload = require("../middleware/upload");

route.get("/", async (req, res) => {
  try {
    const blogs = await Blogs.findAll();
    res.json({
      status: true,
      message:blogs,
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
    const blog = await Blogs.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      status: true,
      message:blog,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
});

route.get("/latest/updatedblogs", async (req, res) => {
  try {
    const latestBlogs = await Blogs.findAll({
      order: [["updatedAt", "DESC"]],
      limit: 5,
    });
    res.json({
      status: true,
      message:latestBlogs,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
});

route.get("/published", async (req, res) => {
  try {
    const publishedBlogs = await Blogs.findAll({
      where: {
        archive: false,
      },
    });
    res.json({
      status: true,
      message:publishedBlogs,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
});

route.get("/archived", async (req, res) => {
  try {
    const archivedBlogs = await Blogs.findAll({
      where: {
        archive: true,
      },
    });
    res.json({
      status: true,
      message:archivedBlogs,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
});

route.get("/category/:category", async (req, res) => {
  try {
    const categoryBlogs = await Blogs.findAll({
      where: {
        category_id: req.params.category,
      },
    });

    res.json({
      status: true,
      message:categoryBlogs,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
});

route.post("/", upload.single("blogimg"), async (req, res) => {
  try {
    const newBlogs = await Blogs.create({
      smm_member_name: req.body.smm_member_name,
      title: req.body.title,
      body: req.body.body,
      img_url: req.file.filename,
      archive: req.body.archive,
      category_id: req.body.category_id,
      blogimg: req.body.path,
    });
    res.json({
      status: true,
      message:newBlogs,
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
    const editBlogs = await Blogs.update(
      {
        smm_member_name: req.body.smm_member_name,
        title: req.body.title,
        body: req.body.body,
        img_url: req.body.img_url,
        archive: req.body.archive,
        category_id: req.body.category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
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
    await Blogs.destroy({
      where: {
        id: req.params.id,
      },
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
