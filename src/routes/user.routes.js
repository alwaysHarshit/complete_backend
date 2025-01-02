import {Router} from "express";
import userRegister from "../controllers/user.controller.js";
const router = Router();

router.route("/resister").post(userRegister);
export default router;
