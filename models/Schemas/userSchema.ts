
import mongoose from 'mongoose';
import { user } from '../../types';
const bcrypt = require("bcrypt")



const userSchema = new mongoose.Schema<user>({
    name: { type: String, required: true },
    email: { type: String, required: true },

    password:{
        type:String, 
        require:true
    },
    musicAdd:[{type: mongoose.Schema.Types.ObjectId , ref: "musicSchema"}],
   
});

userSchema.pre("save",async function (next){
   
    const salt = await bcrypt.genSalt(10);
    const  hashedPassword = await bcrypt.hash(this.password, salt);
    this.password=hashedPassword
    next()
})



module.exports=mongoose.model<user>("userSchema",userSchema);