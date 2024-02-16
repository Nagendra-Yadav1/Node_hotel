const express=require("express")
const Person=require("./../models/person");
const router=express.Router();
router.post("/",async(req,res)=>{
    try{
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log("Data saved")
        res.status(200).json(response)

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal"})
    }

});

router.get("/",async(req,res)=>{
    try{
        const data=await Person.find();
        console.log("data fetched")
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Internal"})
    }
});




router.get("/:workType",async(req,res)=>{
    try{
        const workType=req.params.workType
        if(workType=="chef"|| workType=="manager" || workType=="waiter"){
            const response=await Person.find({work:workType});
            console.log("response fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Invalid work type"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server Error"})
    }
});




   
router.put("/:id",async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedData,{
            new:true,
            runValidators:true
        });

        if(!response){
            return res.status(400).json({error:"Person not found"})
        }
        console.log("Data updated");
        res.status(200).json(response)

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
})



router.delete("/:id",async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error:"Person not found"})
        }
        console.log("Data deleted successfully");
        res.status(200).json({message:"Data deleted successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({eror:"Internal server error"})
    }
});

module.exports=router;
