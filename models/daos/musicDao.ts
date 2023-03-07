import { promises } from "dns";
import { music } from "../../types";


export interface musicDao{
    createMusic(music:music):Promise<music>;
     getMusicById(id:string): Promise<any>;
     getAllMusic():Promise<music>;

}