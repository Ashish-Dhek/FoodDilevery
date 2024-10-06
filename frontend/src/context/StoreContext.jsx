import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { set } from "mongoose";



export const StoreContext = createContext(null);



const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});
    const [food_list,setFoodList]= useState([]);
    const[reloadState,setReloadState]= useState(false);

    const url= "https://fooddilevery-backend.onrender.com";
    const  [token, setToken]= useState("");




    // fetch food list from databse

    const fetchFoodList= async()=>{

        const response= await axios.get(url+"/api/food/list");
        console.log(response);
        setFoodList(response.data.data);
    }


    // if we reload so we didnot logout
    useEffect(()=>{
        
        console.log("token changed");
        // whenever the page reload we call this function
        async function loadData() {
            fetchFoodList();

            if(localStorage.getItem("token"))
                {
                    setToken(localStorage.getItem("token"))   
                    await loadCartData(localStorage.getItem("token"));
                }
        }

        setReloadState(false);
        loadData();

    },[token,reloadState])


    // loading cart data
    const loadCartData= async(token)=>{
        const response= await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }




    // adding item to the cart
    const addToCart = async (itemId) => {

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if(token)
        {
             await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }


    // removing item from the cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {

            const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };

            if (updatedCart[itemId] <= 0) {
                delete updatedCart[itemId]; // Remove the item from the cart if its value is 0
            }
            return updatedCart;
        });

        if(token)
        {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }

    }


    // getting total cart amount from cart array
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        // console.log(totalAmount)
        return totalAmount;
    }

    // useEffect(()=>{
    //     // console.log(cartItems)
    //     console.log(getTotalCartAmount())

    // },[cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        setReloadState,


    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;