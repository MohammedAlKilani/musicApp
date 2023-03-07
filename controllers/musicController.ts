import { Request, Response } from "express";
import { MulterFile, music } from "../types";
import { dbstor } from "../models/dbAccess";
const path = require("path") ;
const fs =require("fs")
const db =new dbstor




export const allMusic =async (req:Request,res:Response)=>{

   const allMusic =await db.getAllMusic().catch((e)=>{
        console.log(e);
    })
    return res.json(allMusic);
    
}
export const streamMusic =async (req:Request,res:Response)=>{
    
try {

    const music = await  db.getMusicById(req.params.id)
    const mimeType =  music.mimeType
   
    const pathMudic = `../${music.path}`

     res.writeHead(200,{"Content-Type":mimeType})
    
    
       
    
     await fs.exists(path.join(__dirname,pathMudic),(exi:boolean)=>{
            if(exi){
            const restream = fs.createReadStream(path.join(__dirname,pathMudic));
                    restream.pipe(res)
                    return
            }
        
    })



    
} catch (error) {
    return res.status(404).send("not found music")
    
}
    
  

}


