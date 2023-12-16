import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import swaggerOptions from './utils/swaggerOptions.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

//error handler
import errorResponserHandler from "./middleware/errorHandler.js";
// import { invalidPathHandler } from "./middleware/errorHandler.js";

//routes
import UserRoutes from "./routes/UserRoutes.js";
import EventRoutes from "./routes/EventRoutes.js";

dotenv.config();
connectdb();

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI



const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(errorResponserHandler);

app.get('/', (req,res)=>{
    res.send("server is running...");
});

//add the routes for the api here
//adding the apis to the express app (ex: added user api)
app.use('/api/users',UserRoutes);   
app.use('api/events/',EventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))