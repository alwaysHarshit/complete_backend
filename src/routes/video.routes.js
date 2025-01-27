import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWtToken} from "../middlewares/auth.middleware.js";
import {getVideoByTitle, uploadNewVideo} from "../controllers/video.controller.js";

export const routerVideo= Router();
routerVideo.route('/video/upload').post(upload.single('videoFile'),verifyJWtToken,uploadNewVideo);
routerVideo.route('/video/getVideo').post(verifyJWtToken,getVideoByTitle);