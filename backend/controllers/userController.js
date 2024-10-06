import userModel from "../models/userModel.js";
import  jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"


// creating token
const createToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);

}



// Login user
const loginUser= async(req,res)=>{
    
        
    const {email,password}= req.body;
    
    try {
        const user=await userModel.findOne({email});

        if(!user)
        {
            return res.json({ success:false, message:"User not found"});
        }

        const isMatch= await bcrypt.compare(password, user.password);  // comparing user password with databse

        if(!isMatch)
        {
            return res.json({ success:false, message:"Invalid password"});
        }

        //creating token
        const token= createToken(user._id);

        res.json({success:true, token});
        

    } catch (error) {
        
        res.json({success:false, message:"Error while login"});
    }

}


// Register user
const registerUser= async(req,res)=>{

    const {name,email,password}= req.body;

    try{
        const exsist= await userModel.findOne({email});

        if(exsist)
        {
            return res.json({success:false, message:"Email already exsist"})
        }

        // validating email format and strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false, message:"Invalid Email"})  // not a valid mail checking
        }  


        // hashing user password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);
        

        // creating new user for databse
        const newUser= new userModel({
            name,
            email,
            password:hashedPassword,
        })

        const user =await newUser.save();
        const token= createToken(user._id);
        res.json({success:true, token});

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false, message:"Error occur while login "});
    }
}


export {loginUser, registerUser};