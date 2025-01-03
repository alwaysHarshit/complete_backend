import {Router} from "express";
import userRegister from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
const router = Router();

// Define a POST route for "/resister" with two middleware functions:
// 1. `upload.fields` middleware to handle file uploads for 'avatar' and 'coverImage' fields.
// 2. `userRegister` controller to handle the registration logic.
router.route("/resister").post(
  upload.fields([
    {
      name: 'avtar', // Field name for avatar image
      maxCount: 1 // Maximum number of files for this field
    },
    {
      name: 'coverImage', // Field name for cover image
      maxCount: 1 // Maximum number of files for this field
    }
  ]),
  userRegister // Controller function to handle the registration logic
);
export default router;
