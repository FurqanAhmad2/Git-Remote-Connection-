const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
var counter = 1;
const control = require("../controllers/controller");

route.use(bodyParser.urlencoded({ extended: false }));
route.use(bodyParser.json());


route.get("/", (req, res) => {
  res.send(`This is Hello World`);
});


route.get("/signup", (req, res)=>{
  res.render("signup");
})


route.get("/signin", (req, res)=>{
  res.render("login");
})


route.get("/dashboard", (req,res)=>{
  res.render("dashboard");
})


route.get("/addRes", (req,res)=>{
  res.render("AddResturant");
})




route.post("/signup", control.signUp);

route.post("/signin", control.login);

route.post("/add", control.AddResturant);

module.exports = route;
