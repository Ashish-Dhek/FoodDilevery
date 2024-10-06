import orderModel from "../models/orderModel.js";
import  userModel from "../models/userModel.js";
import Stripe from "stripe";



const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);


// Placing user order from frontend
const placeOrder = async (req, res) => {

    const frontEndUrl= process.env.FRONTEND_URL;

    try {

        console.log(req.body.items);
        const newOrder= new orderModel({
            userId: req.body.userId,
            item: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});  // after placing order user cart will get empty



        // ============== stripe payemnet start =========
        // const line_items= req.body.items.map((item)=>({
        //     price_data:{
        //         currency:"inr",
        //         product_data:{
        //             name:item.name
        //         },
        //         unit_amount:item.price*100*80, // converting to inr

        //     },
        //     quantity: item.quantity
        // }));

        // line_items.push({
        //     price_data:{
        //         currency:"inr",
        //         product_data:{
        //             name: "Delievery Charges"
        //         },
        //         unit_amount: 2*100*80  
        //     },
        //     quantity: 1
        // })

        // const session = await stripe.checkout.sessions.create({
        //     line_items: line_items,
        //     mode: 'payment',
        //     success_url:`${frontEndUrl}/verify ? success=true:&orderId=${newOrder._id}`,
        //     cancel_url: `${frontEndUrl}/verify ? success=false:&orderId=${newOrder._id}`

        // })


        // res.json({success:true, session_url: session.url});
        res.json({success:true, message:"Order placed succesfully"});


        
    } catch (error) {

        console.log(error);
        res.json({success:false, message:"Error occur while placing order"})
        
    }
}


// current user order list
const userOrders= async(req,res)=>{

    try {
        // console.log(req.body);
        const orders= await orderModel.find({userId: req.body.userId});
        // console.log(orders[0].amount);
        res.json({success:true, data:orders});

    } catch (error) {
        // console.log("Error");
        res.json({success:false, message:"failed to fetch orders"});
    }

}


// Get all orders of all user for admin
const listOrders= async(req,res)=>{

    try {
        const orders= await orderModel.find({});
        res.json({success:true, data:orders});

    } catch (error) {
        res.json({success:false,message:"Error while fetching orders"});
    }

}

// api for updating order status
const updateStatus = async (req,res)=>{

    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true, message:"Status updated"})
    } catch (error) {

        console.log(error)
        res.json({succes:false, message:"Error"})
    }

}


export {placeOrder, userOrders,listOrders,updateStatus};