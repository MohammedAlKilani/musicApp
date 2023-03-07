
import { musicDao } from "./musicDao";
import { userDao } from "./userDao";


export interface dataStor extends musicDao ,userDao {}
