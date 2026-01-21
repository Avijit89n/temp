import {Router} from "express"
import { setdata } from "../controllers/temp.controller.js";

const router = Router();

router.route('/data').post(setdata)


export default router