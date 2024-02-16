const express=require("express")
const router=express.Router()
const MenuItem=require("./../models/menu")


router.post("/",async(req,res)=>{
    try{
        const menu=req.body;
        const newmenuitem=new MenuItem(menu);
        const menu_response=await newmenuitem.save()
        console.log("Data saved")
        res.status(200).json(menu_response);
    }
    catch(error){
        console.log(err)
        res.status(500).json({error:"Internal"})
    }
})


router.get("/",async(req,res)=>{
    try{
        const menu=await MenuItem.find()
        console.log("Data fetched ")
        res.status(200).json(menu)
    }

    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal"})

    }


})




router.get("/:menuType",async(req,res)=>{
    try{
        const menuType=req.params.menuType
        if(menuType=="sweet"  || menuType=="spicy"|| menuType=="sour"){
            const menu=await MenuItem.find({taste:menuType})
            console.log("Data fetched")
            res.status(200).json(menu)
        }
        else{
            console.log("Data not found")
            res.status(400).json({error:"Invalid menuType"})
        }

    }
    catch(erorr){
        console.log(erorr);
        res.status(500).json({error:"Internal error"})

    }
})



router.put("/:id",async(req,res)=>{
    try{
        const MenuId=req.params.id;
        const Menu=req.body;
        const updated_menu=await MenuItem.findByIdAndUpdate(MenuId,Menu,{
            new:true,
            runValidators:true
        });

        if(!updated_menu){
            return  res.status(400).json({error:"Menu not found"})
        }
    
        console.log("Data updated successfully");
        res.status(200).json(updated_menu);
    }

    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }

})


router.delete("/:id",async(req,res)=>{
    try{
        const menuId=req.params.id;
        const response=await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(400).json({message:"Menu Not found"})
        }
        console.log("Data Deleted successfully");
        res.status(200).json({message:"Data deleted successully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"})

    }
})

module.exports=router