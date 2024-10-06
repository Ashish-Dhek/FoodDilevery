import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import {Toaster, toast} from 'react-hot-toast'
import MyOrders from './pages/MyOrders/MyOrders'


const App = () => {

  const[showLogin,setshowLogin]= useState(false);

  return (
    <>
      <Toaster/>
     {
      showLogin?<LoginPopUp   setshowLogin={setshowLogin} />:<></>
     } 

    <div className='app'>
 
      <Navbar  setshowLogin={setshowLogin}  />

      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route   path='/cart' element={<Cart/>} />
        <Route   path='/order' element={<PlaceOrder/>} />
        <Route   path='/myorders' element={<MyOrders/>} />

      </Routes>

    </div>

    <Footer/>

    </>

  )
}

export default App
