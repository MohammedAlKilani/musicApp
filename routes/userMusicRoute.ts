import { uploadMusic } from "../controllers/userMusicController";
import { MulterFile } from "../types";

const multer  = require('multer')
const router = require("express").Router();
const upload = multer({ dest: 'uploads/' ,
fileFilter: function(req:MulterFile, file:any, cb:any ){
  console.log(file.mimetype.split("/")[0])
    if(file.mimetype.split("/")[0] =="audio"){
        return cb(null, true );
      } else {
        return cb(  null, false ,req.multerErr = "bad file");
 
      }
} })

router.route("/upload").post(upload.single('File'),uploadMusic);
module.exports = router;