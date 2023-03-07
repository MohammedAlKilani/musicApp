import { UserInRequest, user} from "../types";
import {NextFunction, Request, Response } from "express";

require('dotenv').config()
const jwt = require('jsonwebtoken');

export const jwtVerify = (req:UserInRequest,res:Response,next:NextFunction)=>{

    const authHead =req.headers.authorization;
    if(!authHead) return res.status(401).end("NO authorization");

    if(!(authHead?.split(' ')[0]=="Bearer")) return res.status(401).end("NO authorization");
    

    const token = authHead?.split(' ')[1];
    try{
    req.user = jwt.verify(
        token,
        process.env.SECRET_ACCESS_TOKEN )


        
    }catch(err){
        if(err)
           return res.status(403).end("forbidden "); 
        
    }
  
    next()

}


