import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";


const userRouter= express.Router();  // making a user router


userRouter.post("/register",registerUser); // api endpoint for registering user
userRouter.post("/login",loginUser); // api endpoint for login user


export default userRouter;