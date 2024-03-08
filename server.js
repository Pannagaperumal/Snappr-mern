import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";

//error handler
import errorResponserHandler from "./middleware/errorHandler.js";
// import { invalidPathHandler } from "./middleware/errorHandler.js";

//routes
import UserController from "./controllers/UserController.js";
import EventController from "./controllers/EventController.js";
import PhotographerController from "./controllers/PhotographerController.js";


dotenv.config();
connectdb();

/**
 * Express application instance.
 * @type {Object}
 */
const app = express();
app.use(express.json());


app.use(errorResponserHandler);

app.get('/', (req,res)=>{
    res.send("server is running...");
});

//add the routes for the api here
//adding the apis to the express app (ex: added user api)
app.use('/api/users',UserController);   
app.use('api/events/',EventController);
app.use('api/',PhotographerController);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))