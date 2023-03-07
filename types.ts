import { RequestHandler , Request } from "express";


export interface user {

    id:number,
    name:string,
    email:string,
    password:String,
    musicAdd:string[],
}


export interface music {

    id:number,
    titel:string,
    authorId: object,
    makeAt : Date,
    path : string,
    mimeType : string
}





export interface UserInRequest extends Request {
    user: {
        id: string,
        name: string,
     
    },
    
  }


  export interface MulterFile extends UserInRequest {
    file:{ 
        fieldname: string,
        originalname: string,
        encoding: string,
        mimetype: string,
        destination: string,
        filename: string,
        path: string,
        size: number,
        
}
    titel: string ,
    multerErr : string ,
  }
  