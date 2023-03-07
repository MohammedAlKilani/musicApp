import { Request, Response } from "express";
import { MulterFile, music } from "../types";
const multer =require("multer") ;
import { dbstor } from "../models/dbAccess";
const db =new dbstor

export const uploadMusic =async (req:MulterFile,res:Response)=>{

    const upload = multer().single('yourFileNameHere');

    if (req.multerErr) {
       return res.status(400).send(req.multerErr)
    }else if(!req.file){
        return res.status(404).json({message : "No file"})
    }
    
    console.log(req.file.mimetype)
    const titel = await req.body.tit

     const Music ={
         titel:titel,
            authorId: req.user.id,
            path: req.file.path ,
            mimeType : req.file.mimetype
        }

    try {
        res.json(await db.createMusic(Music)); 
    } catch (error) {
        console.log(error)
    }


}