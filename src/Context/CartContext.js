import axios from "axios";
import { createContext,useEffect,useState } from "react";



export let CartContext=createContext();

export default function CartContextProvider(props)
{
    let headers={
        token:localStorage.getItem('userToken'),
    }
     
    const[cartId,setCartId]=useState(null);

    function addToCart(pId)
    {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:pId,
        },
        {
            headers:headers
        }).then((response)=>response).catch((err)=>err)
    } 

    function getLoggedUserCart()
    {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers}).then((response)=>response).catch((err)=>err)
    }

    function removeCartItem(pId)
    {
         return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`,{headers})
                .then((response)=>response).catch((err)=>err);
    }

    function ubdateProductQuantity(pId,count)
    {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`,{count:count},{headers})
               .then((response)=>response).catch((err)=>err);
    }

    function onlinePayment(cartId,url,values)
    {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
            shippingAddress:values
        },
        {
            headers:headers

        }
        ).then((response)=>response).catch((err)=>err);
    }

    async function getCartId()
    {
        let {data}=await getLoggedUserCart();
        setCartId(data?.data._id);
    }

    useEffect(()=>{
        getCartId();
    },[]);


   return <CartContext.Provider value={{addToCart,getLoggedUserCart,removeCartItem,ubdateProductQuantity,onlinePayment,cartId}}>
       {props.children}
     </CartContext.Provider>
}