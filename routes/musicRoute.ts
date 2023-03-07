
import {  allMusic, streamMusic} from "../controllers/musicController";
import { MulterFile  } from "../types";

const router = require("express").Router();

router.route("/all").get(allMusic);
router.route("/stream/:id").get(streamMusic);





module.exports = router;