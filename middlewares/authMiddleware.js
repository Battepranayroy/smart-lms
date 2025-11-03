import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect=async (req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token) return res.status(401).json({ message: "Not authorized, no token" });

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decode.userId).select("-password");
        next();
    }catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const admin=async (req,res,next)=>{
    if(req.user && req.user.role==="admin") next();
    else res.status(403).json({message:"access denied"});
}

