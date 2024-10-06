import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";



// App config
const app= express();
const PORT= process.env.PORT | 4000;


// Middleware
app.use(express.json())  // all the request getting from frontend will be parse to json
app.use(cors()) //we can acces backend form any frontend


// Databse connection
connectDB();




// ==================Api endpoints  ==========================================

app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));

app.use("/api/user",userRouter);

app.use("/api/cart",cartRouter);

app.use("/api/order",orderRouter);



app.get("/",(req,res)=>{
    res.send("Api working");
})


// =============== End ====================================================



// run express server
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
});



