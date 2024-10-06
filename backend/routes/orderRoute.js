import { listOrders, placeOrder, updateStatus, userOrders } from "../controllers/orderController.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";



// creating order router
const orderRouter= express.Router();


orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);

export default orderRouter;
