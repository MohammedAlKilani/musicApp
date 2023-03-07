import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { jwtVerify } from "./middleware/jwtVerify";
import { UserInRequest } from "./types";
import { corsMiddleware } from "./middleware/corsMiddleware";
const musicRoute = require("./routes/musicRoute")
const userMusicRoute =require("./routes/userMusicRoute")
const express =require("express");
const app = express();
const helmet =require("helmet")
const xss =require("xss-clean")
const rateLimit =require("express-rate-limit")
const cors = require("cors");
const authRoute =require("./routes/authRoute");
const logOutRoute =require("./routes/logOutRoute");
const mongoose = require('mongoose');
const port = 5000;
const cookieParser = require('cookie-parser')
mongoose.set('strictQuery', true);
app.use(express.json());
app.use(cookieParser())
app.use(helmet())
app.use(xss())
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use(cors({origin: 'http://localhost:3000',
optionsSuccessStatus: 200}))

app.use("/",authRoute);

app.use("/music",musicRoute);

app.use(jwtVerify);


app.use("/logout",logOutRoute);

app.get("/hi",(req:UserInRequest,res:Response)=>{

  res.end(`Hi ${req.user.name} \n ${req.user.id} `)
  
});

app.use("/usermusic",userMusicRoute);



app.all("*",(req:Request,res:Response,next:NextFunction)=>{

    res.status(404).end("NOT FOUND");

 
  });



app.use((err:any ,req:Request,res:Response,next:NextFunction)=>{

  
  if(err){
    console.log(err)
     res.status(500).json({err: err});
    }
 
  
});

(async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/musicApp')
    .then(() => console.log('Connected!'));
    

    app.listen(port,()=>{
    console.log(`run in http://localhost:${port}`);
})})().catch((err)=> console.log(err));;
