import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//register

export const register= async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"user already exists"});

        const user=await User.create({name,email,password,role});
        const token=generateToken(user._id);

        res.cookie("token",token,{httpOnly:true}).status(201).json({message:"User registered successfully",user});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

//login
export const login= async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"User not found"});

        const isMatch=await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token=generateToken(user._id);
        res.cookie("token",token,{httpOnly:true}).status(200).json({message:"login successful",user});
    }catch(error){
        res.status(400).json({message:error.messgage});
    }
    
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};