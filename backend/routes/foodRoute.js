import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";



// making a router
const foodRouter= express.Router();


// storing of photo at multer 
const storage= multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb)=>{
            return cb(null,file.originalname);
    }
})

const upload = multer({storage: storage});





// all  routes 

foodRouter.post("/add",upload.single("image"),addFood);   // adding food item in database by calling addDood func
foodRouter.get("/list",listFood);  // getting all the food from database
foodRouter.post("/remove",removeFood);  // removing food from databse



export default foodRouter;