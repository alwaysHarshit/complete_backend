import dotenv from 'dotenv';
import {dbConnect} from "./db/dbConnect.js";
import {app} from "./app.js";

// Load environment variables from .env file

dotenv.config({
    path: './env'
});

dbConnect()
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
