import express from 'express';
export const app = express();
import cors from 'cors';

app.use(cors(
	{
		origin:process.env.CORS_ORIGIN,
		credentials:true
	}
));
import cookieParser from "cookie-parser";
app.use(cookieParser());//allow to execess cookie in res and req
//routes import
import userRouter from "./routes/user.routes.js";

//routes definition
app.use('/users', userRouter);


