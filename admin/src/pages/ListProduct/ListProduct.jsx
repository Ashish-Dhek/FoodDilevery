import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const ListProduct = ({url}) => {


  const [list,setList]= useState([]);

  const fetchList = async ()=>{
    const response= await axios.get(`${url}/api/food/list`);
    console.log(response.data.data);

    if(response.data.success)
    {
      setList(response.data.data);  
      // toast.success("Data is loaded")

    }
    else{
      toast.error("Error occured while loading data");
    }

  }

  // api fro removing food from databse
  const removeFood= async(foodId) =>{

    const response= await axios.post(`${url}/api/food/remove`,{id:foodId});

    if(response.data.success)
    {
      toast.success(response.data.message);
     await fetchList();  // again reloading the list
    }
    else
    {
      toast.error("Error occured while deleting food item");
    }

  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>

        </div>
        {list.map((item,index)=>{
          return(
             <div key={index} className='list-table-format'>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>Rs {item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>&times;</p>
             </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListProduct
