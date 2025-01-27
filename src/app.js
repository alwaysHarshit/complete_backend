import express from 'express';
export const app = express();
import cors from 'cors';

app.use(cors(
	{
		origin: process.env.ALLOWED_ORIGIN.split(','),
		credentials:true
	}
));
import cookieParser from "cookie-parser";
app.use(cookieParser());//allow to execess cookie in res and req
//routes import
import userRouter from "./routes/user.routes.js";
import {routerVideo} from "./routes/video.routes.js";

//routes definition
app.use('/users', userRouter);
app.use('/videos',routerVideo);


