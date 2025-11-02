import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";



dotenv.config();// loads all .env variables into process.env
const app=express();// create a server
const PORT=process.env.PORT || 4000;

//application middlewares

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

//routes
app.use('/api/auth',authRoutes)
app.get('/',()=> console.log("default loading route"))

//start the server;
app.listen(PORT,()=>{
    connectDB();
    console.log(`server running on port ${PORT}`)
});
