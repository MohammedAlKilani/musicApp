import { RequestHandler } from "express";
import {dbstor} from "../models/dbAccess";
const bcrypt = require("bcrypt")

require('dotenv').config()
const jwt = require('jsonwebtoken');
const db =new dbstor



export const signupControl: RequestHandler =async (req,res)=>{



    const findUser = await db.getUserByEmail(req.body.email) ;
    if(findUser){
        return res.status(406).send("this email is used ");

    }

    const user = await db.createUser(req.body);
    
    const token= await db.jwtAuth(user);
    
    res.cookie("jwt",token[0],{httpOnly:true,maxAge:28*60*60*1000})
    return res.json(token[1]);
}


export const signInControl: RequestHandler =async (req,res)=>{
  
  
  
  const findUser = await db.getUserByEmail(req.body.email) ;
    
    if(findUser){
      const userpassword = String(findUser.password) ;
      
      if(await db.matchPassword(req.body.password,userpassword)){

        

        const token= await db.jwtAuth(findUser);

       
         res.cookie("jwt",token[0],{httpOnly:true,maxAge:28*60*60*1000});
        
    
        
         return res.json(token[1]);
            }
            return res.status(400).send("passward is wrong")
            
        }
        return res.status(400).send("email is wrong")

      }