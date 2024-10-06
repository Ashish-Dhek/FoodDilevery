import React, { useState, useEffect,useContext } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import {Toaster, toast} from 'react-hot-toast'


const LoginPopUp = ({setshowLogin}) => {

    const {url,setToken,token} = useContext(StoreContext);
    const [currentState,setcurrentState]=useState("Login");
    
    const [data,setData]= useState({
      name:"",
      email:"",       // user data state
      password:""
    })


    // function for saving user data input in frontend
    const onChangeHnandler= (event)=>{
      const name= event.target.name;
      const value= event.target.value;

      setData(data=>({...data,[name]:value}));    // updating the data


    }


    // whne user click login button
    const onLogin = async(event)=>{

      event.preventDefault();
      
      let newUrl= url;

      if(currentState==="Login"){
        newUrl= newUrl+"/api/user/login";  // when user is login
      }
      else
      {
        newUrl= newUrl+"/api/user/register"; // when user is registering
      }

      const response= await axios.post(newUrl,data);

      if(response.data.success)
      {
          setToken(response.data.token);
          // console.log(response.data.token);
          localStorage.setItem("token", response.data.token);
          setshowLogin(false);
          // console.log("account created succesfully");
          if(currentState=="Login")
          {
            toast.success('Login Succesfully!')
          }
          else
          {
            toast.success('User Registered!')
          }
      }
      else
      {
        toast.error(response.data.message);
      
      }

    }




    // to stop scrolling whenever login popup is displayed
    useEffect(() => {
      // Disable scroll when the popup is shown
      document.body.style.overflow = 'hidden';
  
      // Cleanup function to reset scroll when the popup is closed
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, []);



  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">

        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setshowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-input">
           {currentState=="Login"? <></>  : <input type="text" name='name' onChange={onChangeHnandler}  value={data.name} placeholder='Name' required /> }
            
            <input name='email' onChange={onChangeHnandler}  value={data.email} type="email" placeholder='Email' required />
            <input name='password' onChange={onChangeHnandler}  value={data.password} type="password" placeholder='Password' required />

        </div>
        <button type='submit'>{
            currentState==="Sign up"?"Create account":"Login"
            }</button>

        <div className="login-popup-condition">
            <input type="checkbox" required /> 
            <p>By counting, I agree to the terms of use & privacy</p>
        </div>
            {currentState=="Login"
            ? 
            <p>Create a new account ? <span onClick={()=>setcurrentState("Sign up")} >Click here</span></p> 
            :
              
            <p>Already have an account ? <span onClick={()=>setcurrentState("Login")} >Log in</span> </p>
            }
          
      </form>
    </div>
  )
}

export default LoginPopUp
