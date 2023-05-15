const express = require("express");
const app = express();
const db = require ("./config/db");


const blogsModel = require("./models/blogs.model");
const blogsCategoriesModel = require("./models/blogsCategories.model");

app.use(express.json());

app.use('/uploads', express.static('uploads'));


blogsCategoriesModel.hasMany(blogsModel, {
    foreignKey:'category_id'
  });
  

db.authenticate().then(() => {
    db.sync({ alter: true });
    console.log("connect");
})

app.use("/180blogs", require("./routes/blogs.route"));
app.use("/180blogscategories", require("./routes/blogsCategories.route"));


app.listen(5400, () => {
    console.log("Running");
});