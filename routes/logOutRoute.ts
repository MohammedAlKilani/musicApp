import Express  from "express";

const router = require("express").Router();

router.route("/").post((req:Express.Request,res:Express.Response)=>{

    if(req.cookies.jwt){
        res.clearCookie("jwt",{httpOnly:true,maxAge:28*60*60*1000});
        return res.status(204)
      
    }
    


})



module.exports = router;