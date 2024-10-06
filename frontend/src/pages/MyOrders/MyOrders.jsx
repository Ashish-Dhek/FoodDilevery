import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const [data,setData]= useState([]);
    const {url,token}= useContext(StoreContext);


    // fetching all the current user orders data
    const fetchOrders= async()=>{
        const response= await axios.post(url+"/api/order/userorders",{},{headers:{token}});  
        setData(response.data.data);    
        console.log(data);
       
    }

    useEffect(()=>{
        if(token)
        {
            fetchOrders();
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order,index)=>{
                        return (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>
                                    {
                                       
                                        order.item.map((item, i) => {
                                            if (i === order.item.length - 1) {
                                            // return item.name + " x " + item.quantity;
                                            return item.name + " x" + item.quantity;
                                            }
                                            else
                                            {
                                                return item.name + " x" + item.quantity+", ";
                                            }
                                           
                                        })
                                }
                                </p>

                                <p>Rs {order.amount}.00</p>
                                <p>Items: {order.item.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={()=>fetchOrders()}>Tack Order</button>
                            </div>
                        )
                })
            }
        </div>
    </div>
  )
}

export default MyOrders
