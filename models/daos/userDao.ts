

import { user } from "../../types";

export interface userDao {
    createUser(user:user):Promise<user>;
    getUserByEmail(email:string):Promise<object|null>;
    matchPassword(Password:string,userpassword: string): Promise<boolean>;
    jwtAuth(user:user):Promise<string[]>;
    

}