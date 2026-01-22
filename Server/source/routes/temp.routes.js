import {Router} from "express"
import { setdata } from "../controllers/temp.controller.js";
import upload from "../middleware/multer.middleware.js";


const router = Router();

router.route('/data').post(upload.none(), setdata)


export default router