import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import {Toaster, toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";





const PlaceOrder = () => {

  const navigate = useNavigate();
  const {getTotalCartAmount,token,setToken,food_list,cartItems,url,setReloadState}= useContext(StoreContext);
  const [data,setData]= useState({
    firstName: "",
    lastName:"",
    email:"",
    street:"",       // state variable for storing user data for placing order
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })



  // placing order we will redirect to payment gateway
  const placeOrder= async(event)=>{
    event.preventDefault();

    let orderItems= [];

    food_list.map((item)=>{
      if(cartItems[item._id]>0)
      {
        let itemInfo = item;
        itemInfo["quantity"]= cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    // console.log(orderItems);

    let orderData= {
      address:data,
      items:orderItems,
      amount: getTotalCartAmount()+20,
    }
    


    let response= await axios.post(url+"/api/order/place", orderData,{headers:{token}})

    if(response.data.success)
    {
      // const {session_url}= response.data;
      // window.location.replace(session_url); 


    
      toast.success(response.data.message);
      setReloadState(true); 
      navigate("/myorders");


    }
    else{
    
      toast.error(response.data.message);
      // console.log("not succesfull")
      navigate("/");

    }

  }


  const onChnageHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData((prev)=>({...prev,[name]:value}));
    // console.log(data);
  }



  useEffect(()=>{
    if(!token)
    {
      navigate('/cart');
    }
    else if(getTotalCartAmount()==0)
    {
      navigate('/cart');
    }
  },[token])




  return (
    <form className="place-order" action=""   onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information </p>
        <div className="multi-fields">
          <input onChange={onChnageHandler} name="firstName" value={data.firstName} type="text" placeholder="First Name"  required  />
          <input onChange={onChnageHandler} name="lastName" value={data.lastName} type="text" placeholder="Last Name"  required />
        </div>

        <input onChange={onChnageHandler} name="email" value={data.email} type="text" placeholder="Email address" required  />
        <input onChange={onChnageHandler} name="street" value={data.street} type="text" placeholder="Street" required />

        <div className="multi-fields">
          <input onChange={onChnageHandler} name="city" value={data.city} type="text" placeholder="City" required />
          <input onChange={onChnageHandler} name="state" value={data.state} type="text" placeholder="State" required />
        </div>

        <div className="multi-fields">
          <input onChange={onChnageHandler} name="zipcode" value={data.zipcode} type="text" placeholder="Zip Code" required />
          <input onChange={onChnageHandler} name="country" value={data.country} type="text" placeholder="Country" required />
        </div>

        <input onChange={onChnageHandler} name="phone" value={data.phone} type="number" placeholder="Phone" required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#x20B9; {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Deliever Fee</p>
              <p>&#x20B9; {getTotalCartAmount() > 0 ? 20 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                &#x20B9;{" "}
                {getTotalCartAmount() > 0 ? getTotalCartAmount() + 20 : 0}
              </b>
            </div>
          </div>

          <button type="submit" >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
