import mongoose from "mongoose";

const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://ashish:Ashu(1981)@cluster0.wsim4.mongodb.net/food-del').then(()=>{
        console.log('MongoDB connected...');
    }).catch((e)=>{
        console.log(e);
    })
}

export default connectDB


// mongodb+srv://ashish:<db_password>@cluster0.wsim4.mongodb.net/?