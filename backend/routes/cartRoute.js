import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";


const cartRouter= express.Router();

cartRouter.post("/add",authMiddleware, addToCart); // api end point for adding item to cart
cartRouter.post("/remove",authMiddleware, removeFromCart); // api end point for removing item ftom cart
cartRouter.post("/get",authMiddleware, getCart); // api end point for getting cart items


export default cartRouter;