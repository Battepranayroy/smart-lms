import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect=async (req,res,next)=>{

    console.log("Cookies:", req.cookies);
    const token=req.cookies.token;

    console.log("Token:", token);

    if(!token) return res.status(401).json({ message: "Not authorized, no token" });

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded token:", decode);
        //req.user=await User.findById(decode.userId).select("-password");
         const user = await User.findById(decode.id);
         console.log("User from DB:", user);

         req.user = user;
        next();
    }catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const admin=async (req,res,next)=>{
    if(req.user && req.user.role==="admin") next();
    else res.status(403).json({message:"access denied"});
}

