
import{ Express, Request, Response } from 'express';
import { signInControl ,signupControl }from '../controllers/authController'
import {signInValidator, signUpValidator} from '../middleware/validator/authValidator'
import { validResult } from '../middleware/validResult';
const router = require("express").Router();




router.route("/").get((req: Request, res: Response)=>{
    res.send("helloWorld");
});

router.route("/signIn").post( signInValidator, 
    
    validResult,signInControl);
router.route("/signUp").post(  
    signUpValidator,
    validResult,signupControl);

module.exports = router;