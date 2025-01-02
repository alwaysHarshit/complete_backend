import express from 'express';
export const app = express();
import cors from 'cors';

app.use(cors(
	{
		origin:process.env.CORS_ORIGIN,
		credentials:true
	}
));
app.use(express.json());
//routes import
import userRouter from "./routes/user.routes.js";

//routes definition
app.use('/users', userRouter);


