const express = require("express");
const app = express();
const path = require("path");

const port = 8080;
app.set("view engine", "ejs");
app.set( "views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

let orders = [{
    // id : "",
    name: "Bluberry",
    photo: "https://i.pinimg.com/564x/fd/f9/ac/fdf9acbc91c52008b260205713c78a59.jpg"
}];

app.get("/", (req, res)=>{
    res.render("home.ejs");
})
app.get("/about", (req,res)=>{
    res.render("about.ejs");
} )
app.get("/bag", (req,res)=>{
    res.render("bag.ejs", {orders});
})
app.get("/contact", (req,res)=>{
    res.render("contact.ejs");
} )
app.listen( port, ()=>{
    console.log("App is listening on port");
});