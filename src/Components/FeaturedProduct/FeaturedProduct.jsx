import style from'./FeaturedProduct.module.css'

import React, { useContext, useEffect, useState } from "react";
import { CounterContext } from "../../Context/CounterContext";
import axios, { all } from "axios";
import{Bars} from 'react-loader-spinner' 
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function FeaturedProduct()
{
   let{addToCart}=useContext(CartContext);

   async function addProduct(pId)
   {
      let response=await addToCart(pId);
      if(response.data.status=='success')
      {
        toast.success('cart successfully added');

      }
      else
      {
        toast.error('error added');
      }
   }
  
  function getFeaturedProducts()
  {
       return  axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  
    let{data,isLoading}=useQuery('featuredProducts',getFeaturedProducts);
  
   return<>   
     
       <h1 className='text-center py-5'>Featured Products</h1>

        <div className='py-3'>
           <div className="row">
             {!isLoading?data.data.data.map((product,idx)=>{return <div className="col-md-2 col-sm-6 col-6" key={idx}>
               
                <div className="product p-3">
                <Link to={`/ProductDetails/${product.id}`}>
                   <img src={product.imageCover} alt="pro" className="w-100" />
                    <h6 className=" text-main fw-bolder">{product.category.name}</h6>
                    <h6 className=" fw-bolder">{product.title.split(' ').slice(0,2).join(' ')}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="fw-bolder">{product.price}EGP</p>
                      <p className=""><span ><i  className={`fa-solid fa-star ${style.starColor}`}></i></span>{product.ratingsAverage}</p>
                    </div>
                 </Link>
                    <button className='btn bg-main text-white w-100 py-0' onClick={()=>addProduct(product.id)}>+ Add To Cart</button>
                </div>
              
             </div>}):<div className="vh-100  d-flex justify-content-center align-items-center">
             <Bars
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  />
       </div>}
             

          </div>
       
          </div>
    </>
}