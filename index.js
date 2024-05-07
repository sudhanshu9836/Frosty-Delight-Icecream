const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const port = 8080;
app.set("view engine", "ejs");
app.set( "views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

let icecream = [
    {
        id: uuidv4(),
        name: "Vanilla",
        photo: "https://i.pinimg.com/736x/10/30/54/103054cdfc7366c30cf2d7e66a423834.jpg"
    },
    {
        id: uuidv4(),
        name: "Chocolate",
        photo: "https://i.pinimg.com/564x/d7/8b/c5/d78bc5f2b1f196e2c00a8b13bb0ff664.jpg"
    },
    {
        id: uuidv4(),
        name: "Strawberry",
        photo: "https://i.pinimg.com/564x/c9/8d/50/c98d50635e5d4e2ab73a9423eb35da3c.jpg"
    },
    {
        id: uuidv4(),
        name: "Mint Chocolate Chip",
        photo: "https://i.pinimg.com/564x/a3/32/83/a33283e4e2a3705813f3575666b2229d.jpg"
    },
    {
        id: uuidv4(),
        name: "Salted Caramel",
        photo: "https://i.pinimg.com/564x/7e/ba/bf/7ebabfb96c9b8970c5bfce360dc80e2d.jpg"
    },
    {
        id: uuidv4(),
        name: "Rocky Road",
        photo: "https://i.pinimg.com/564x/d0/ea/b5/d0eab569ed684462117108eb17a5952f.jpg"
    },
    {
        id: uuidv4(),
        name: "Butter Pecan",
        photo: "https://i.pinimg.com/564x/fc/4e/4d/fc4e4d75bdc73e852d895506621c356a.jpg"
    },
    {
        id: uuidv4(),
        name: "Cookies and Cream",
        photo: "https://i.pinimg.com/564x/f8/d0/f2/f8d0f2ee4bfa2f1d2614088fef5664c6.jpg"
    },
    
]
let yogurt = [
    {
        id: uuidv4(),
        name: "Vanilla Honey Greek Yogurt",
        photo: "https://i.pinimg.com/564x/a3/af/2e/a3af2ecd96d0219a679cce127b49f29a.jpg"
    },
    {
        id: uuidv4(),
        name: "Vegan Almond Milk Yogurt",
        photo: "https://i.pinimg.com/564x/f7/52/1c/f7521c8df9b4dd0516e3fb6fafd966d1.jpg"
    },
    {
        id: uuidv4(),
        name: "Bluberry Frozen Yogurt",
        photo: "https://i.pinimg.com/564x/58/f0/07/58f007b6943e0abbcd48499a63b16481.jpg"
    }
]
let milkshake = [
    {
        id: uuidv4(),
        name: "Oreo Milkshakes",
        photo: "https://i.pinimg.com/564x/10/9c/d2/109cd288493a97b4232a0ee7565660ba.jpg"
    },
    {
        id: uuidv4(),
        name: "Strawberry Milkshakes",
        photo: "https://i.pinimg.com/736x/cb/15/22/cb1522f3deb077c8e53fb3a9648e7e40.jpg"
    },{
        id: uuidv4(),
        name: "Blueberry Milkshakes",
        photo: "https://i.pinimg.com/736x/98/36/09/9836094e818816bfd87e35f5dbc5a412.jpg"
    },{
        id: uuidv4(),
        name: "Chocolate Cookie Milkshake",
        photo: "https://i.pinimg.com/564x/34/64/24/346424e46b419815b19cc32f7b561851.jpg"
    },{
        id: uuidv4(),
        name: "Coffee Milkshake",
        photo: "https://i.pinimg.com/564x/20/74/c6/2074c605228a1b1969e513de87c2c04d.jpg"
    },{
        id: uuidv4(),
        name: "Key Lime Milkshake",
        photo: "https://i.pinimg.com/564x/40/05/97/400597ffd89de2a0cf08d2d1921e5ed4.jpg"
    },
    {
         id: uuidv4(),
         name: "Chocolate Peanut Butter Milkshake",
         photo: "https://i.pinimg.com/736x/11/9b/17/119b1765e72a55234b8c6495f7dc3b30.jpg"   
    },
    {
        id: uuidv4(),
        name: "Caramel Milkshake",
        photo: "https://i.pinimg.com/564x/62/dd/15/62dd15942d0f98ce5caf1c160c73a3a8.jpg"
    }
]

let orders = [{
    name: "Bluberry",
    photo: "https://i.pinimg.com/564x/fd/f9/ac/fdf9acbc91c52008b260205713c78a59.jpg"
}];

app.get("/", (req, res)=>{
    res.render("home.ejs");
})
app.get("/about", (req,res)=>{
    res.render("about.ejs");
} )
app.get("/menu", (req,res)=>{
    res.render("menu.ejs", {icecream, yogurt, milkshake});
})
app.post('/bag', (req, res) => {
    const uuid = req.body.uuid; 
    const item = icecream.find(i => i.id === uuid);
    if ( item ) {
        orders.push(item);
    }
    else{
        const item = yogurt.find(i => i.id === uuid);
        if(item){
            orders.push(item)
        }
        else{
            const item = milkshake.find(i => i.id === uuid);
            if(item){
            orders.push(item)
        }
        }
    }
    res.redirect('/bag');
});

app.get("/bag", (req,res)=>{
    res.render("bag.ejs", {orders});
})
app.delete("/bag/:id",(req, res)=>{
    let id = req.params.id;
    orders = orders.filter( (p)=> id!==p.id);
    res.redirect("/bag")
})
app.get("/contact", (req,res)=>{
    res.render("contact.ejs");
} )
app.listen( port, ()=>{
    console.log("App is listening on port");
});