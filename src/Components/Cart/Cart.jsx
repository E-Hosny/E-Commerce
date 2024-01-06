import React, { useContext, useEffect, useState } from "react";
import style from'./Cart.module.css'
import { CartContext } from "../../Context/CartContext";
import {Bars} from 'react-loader-spinner';
import { Link } from 'react-router-dom';





export default function Cart()
{
     let{getLoggedUserCart,removeCartItem,ubdateProductQuantity}=useContext(CartContext);
     const[cartDetails,setCartDetails]=useState(null);
     
        async function getCart()
        {
          let{data}= await getLoggedUserCart();
          console.log(data);
          setCartDetails(data);
        } 

        async function removeItem(pId)
        {
          let{data}= await removeCartItem(pId);
          setCartDetails(data);
        }

        async function ubdateCount(pId,count)
        {
          let{data}=await ubdateProductQuantity(pId,count);
          setCartDetails(data);
        }

      useEffect(()=>{
           getCart();
      },[])


    return<>
    {cartDetails? <div className="w-75 my-3 mx-auto p-3 bg-main-light">
      <h3>shopping cart</h3>
      <h4 className="h6 text-main fw-bolder py-1">Cart Items : {cartDetails.numOfCartItems}</h4>
      <h4 className="h6 text-main fw-bolder py-1">Total Cart Price : {cartDetails.data.totalCartPrice}</h4>

      {cartDetails.data.products.map((product)=> 
        <div key={product.product.id} className="row border-bottom py-3">
              <div className="col-md-1">
                 <img src={product.product.imageCover} alt="product-img" className="w-100" />
              </div>

              <div className="col-md-11">
                <div className="d-flex justify-content-between align-items-center">
                   <div>
                      <h3 className="h6">{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
                      <h6 className="text-main">price : {product.price} EGP</h6>
                   </div>
                   <div>
                        <button onClick={()=>ubdateCount(product.product.id,product.count+1)} className="btn brdr-main p-2 fw-bolder">+</button>
                         <span className="mx-2 fw-bolder">{product.count}</span>
                         <button onClick={()=>ubdateCount(product.product.id,product.count-1)} className="btn  brdr-main p-2 fw-bolder">-</button>
                   </div>
                         
                </div>
                <button onClick={()=>removeItem(product.product.id)} className="btn p-0"><i className="text-danger font-sm fa fa-trash-can"></i> Remove</button>

              </div>

         </div>  
      )}
      
      <Link to={'/address'} className="btn bg-main m-2 w-25 text-white">online payment</Link>

    </div>: <section className="d-flex justify-content-center align-items-center vh-100"><Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
  /></section> }

    </>
}