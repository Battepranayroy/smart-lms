import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//register

export const register = async (req, res, next) => {
    try {
        //throw new Error("SENTRY_TEST_REGISTER_ERROR");
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "user already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        const token = generateToken(user._id);

        res
          .cookie("token", token, { httpOnly: true })
          .status(201)
          .json({
              message: "User registered successfully",
              user
          });

    } catch (error) {
        next(error);
    }
};

//login
export const login= async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"User not found"});

        const isMatch=await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token=generateToken(user._id);
        res.cookie("token",token,{httpOnly:true}).status(200).json({message:"login successful",user});
    }catch(error){
        next(error);
    }
    
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};