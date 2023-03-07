
import { music, user } from "../types";
import { dataStor } from "./daos";
import { musicDao } from "./daos/musicDao";
const musicSchema = require("./Schemas/musicSchema");
const bcrypt = require("bcrypt")
require('dotenv').config()
const jwt = require('jsonwebtoken');
const userSchema =require("./Schemas/userSchema");

export class dbstor implements dataStor {
 
  
    
    async createUser(user: user): Promise<user> {
      const User= await userSchema.create(user);
       
      return User;

    }
    async getUserByEmail(email:string): Promise<user> {
      const find= await userSchema.findOne({email:email})
      

      return find;
    }
    async matchPassword(Password:string,userpassword: string): Promise<boolean> {

      const isMatch = await bcrypt.compare(Password, userpassword);
      
       return isMatch
    

    }
     async jwtAuth(user: user): Promise<string[]> {

      
         const refreshToken =  jwt.sign({
        id: user.id,
        name:user.name
      }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '2d' });

      const accessToken =jwt.sign({
        id: user.id,
        name:user.name
      },process.env.SECRET_ACCESS_TOKEN,{expiresIn :"1h"});
      
      
      return  [refreshToken,accessToken] 
      

    
    }
   
    async createMusic(music: music | any): Promise<music> {
      const Music= await musicSchema.create(music);
       console.log (await userSchema.findOneAndUpdate(music.authorId,{$push:{musicAdd:Music._id}},{new:true , useFindAndModify:false}))
      
      return Music;
  }

  async getMusicById(id:string): Promise<any> {

    
    const find= await musicSchema.findById(id)
    

    return find; 



}

  async getAllMusic(): Promise<music> {
  const find= await musicSchema.find()
  console.log(find);

  return find ;
}
}