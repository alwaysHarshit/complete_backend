import mongoose from 'mongoose';
import {DB_NAME} from "../constraints.js";

export const dbConnect = async () => {
        //await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)//for online db atlas
        await mongoose.connect(`${process.env.MONGO_LOCAL_URI}`)//for local db
}