import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";



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
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.get('/',()=> console.log("default loading route"))

//start the server;
app.listen(PORT,()=>{
    connectDB();
    console.log(`server running on port ${PORT}`)
});
