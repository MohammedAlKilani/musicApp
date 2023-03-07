import mongoose from 'mongoose';
import { music } from '../../types';


const musicSchema = new mongoose.Schema<music>({

    
    authorId: {type: mongoose.Schema.Types.ObjectId , ref: "userSchema"},
    titel:{ type: String, required: true },
    makeAt : {type: Date , default: ()=> new Date },
    path: { type: String, required: true },
    mimeType : String ,
})

module.exports=mongoose.model<music>("musicSchema",musicSchema);
    