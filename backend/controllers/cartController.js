import userModel from "../models/userModel.js";



// Add items to user cart
const addToCart= async(req,res)=>{

    try {
        
        let userData= await userModel.findOne({_id:req.body.userId});
        let cartData= await userData.cartData;

        if(!cartData[req.body.itemId])
        {
           cartData[req.body.itemId]=1;
        }
        else
        {
            cartData[req.body.itemId]+=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"Item added to cart"});

    } catch (error) {
        // console.log(error.message);
        res.json({success:false, message:"Failed to add item in cart"});
    }
}


// Remove items from user cart
const removeFromCart = async (req, res) => {


    try {
        
        let userData= await userModel.findOne({_id:req.body.userId});
        let cartData= await userData.cartData;

        if(cartData[req.body.itemId]>0)
        {
           cartData[req.body.itemId]-=1;
        }


        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"Item removed from cart"});

    } catch (error) {
        // console.log(error.message);
        res.json({success:false, message:"Failed to remove item from cart"});
    }

}


// fetchUser Cart Data
const getCart = async (req, res) => {

    
    try {
        
        let userData= await userModel.findOne({_id:req.body.userId});
        let cartData= await userData.cartData;
       
        res.json({success:true,cartData:cartData});

    } catch (error) {
        // console.log(error.message);
        res.json({success:false, message:"Failed to get cart items"});
    }

}


export {getCart,removeFromCart,addToCart} ;