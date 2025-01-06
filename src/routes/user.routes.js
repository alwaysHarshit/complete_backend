import {Router} from "express";
import {userLogin, userRegister, userLogout, userGetProfile, updatePassword} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWtToken} from "../middlewares/auth.middleware.js";

const router = Router();

// Define a POST route for "/resister" with two middleware functions:
// 1. `upload.fields` middleware to handle file uploads for 'avatar' and 'coverImage' fields.
// 2. `userRegister` controller to handle the registration logic.

router.route("/resister").post(upload.fields([
	{
		name: 'avtar', // Field name for avatar image
		maxCount: 1 // Maximum number of files for this field
	},
	{
		name: 'coverImage', // Field name for cover image
		maxCount: 1 // Maximum number of files for this field
	}]),
	userRegister // Controller function to handle the registration logic
);

// Define a POST route for "/login" with the `userLogin` controller function.

router.route("/login").post(upload.any(),userLogin);
/*You need the upload.any() middleware for login only because the client is sending data as multipart/form-data. To avoid this dependency:
Ensure login data is sent as JSON with Content-Type: application/json.
Remove the global application of upload.any() and apply it only to routes that require file handling.*/

router.route("/logout").post(upload.any(),verifyJWtToken,userLogout);
router.route("/user").get(verifyJWtToken,userGetProfile)
router.route("/updatePassword").post(upload.any(),verifyJWtToken,updatePassword)
export default router;
