const express=require("express")
const app=express();
const db=require("./db");
const bodyParser=require("body-parser")
app.use(bodyParser.json())
app.get("/",(req,res)=>{
    res.send("welcome to my hotel... How i can help you?, we have list of menu");
});


// Import the menu routes
const menuRoutes=require("./routes/menuRoutes");
app.use("/menu",menuRoutes)


// Import the person route
const personRoutes=require("./routes/personRoutes");
app.use("/person",personRoutes)


app.listen(3000,()=>{
    console.log("This is working 3000 port very well")
})  
