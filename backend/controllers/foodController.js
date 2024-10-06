import foodModel from "../models/foodModel.js";
import fs from "fs"
import cloudinary from "../utils/cloudinary.js";




//add food item to cloudinary and databse
const addFood = async (req, res) => {
    // Check if a file is uploaded
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the image to Cloudinary
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error uploading image"
            });
        }

        // Create a new food item with the uploaded image URL
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: result.secure_url // Get the image URL from the upload result
        });

        try {
            // Save the food item to the database
            await food.save();
            console.log("food is saved")
            res.status(200).json({ success: true, message: "Food added", food });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Error occurred while saving food" });
        }
    });
};


// All food list 
const listFood= async (req,res)=>{
    
    try{
        const foods= await foodModel.find({});  // fetchinf all food data from databse
        res.json({success:true, data: foods});
    }
    catch (error)
    {
        console.log("error while getting food");
        res.json({success:false, message: "Error while getting food"});
    }
}


// Remove food item
const removeFood= async (req,res)=>{
    
    try{
        const food= await foodModel.findById(req.body.id);
        
         // Extract the public ID from the image URL
         const publicId = food.image.split('/').pop().split('.')[0]; // Extract the public ID from the URL

         // Delete the image from Cloudinary
         await cloudinary.uploader.destroy(publicId, (error, result) => {
             if (error) {
                 console.error("Error deleting image from Cloudinary:", error);
                 return res.status(500).json({ success: false, message: "Error deleting image" });
             }
             console.log("Image deleted from Cloudinary:", result);
         });
 
         // Remove the food item from the database
         await foodModel.findByIdAndDelete(req.body.id);
         res.status(200).json({ success: true, message: "Food item removed successfully" });

    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while removing the food item" });
    }
}

export {addFood, listFood, removeFood};



