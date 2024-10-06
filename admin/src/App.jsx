import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct/AddProduct.jsx'
import Orders from './pages/Orders/Orders.jsx'
import ListProduct from './pages/ListProduct/ListProduct.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// dotenv.config();

const App = () => {

  const url="http://localhost:4000";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
            <Sidebar/>

            <Routes>
              <Route path="/add" element={<AddProduct url={url} />} />
              <Route path="/list" element={<ListProduct url={url}/>} /> 
              <Route path="/orders" element={<Orders url={url}/>} />
            </Routes>

      </div>
    </div>
  )
}

export default App
