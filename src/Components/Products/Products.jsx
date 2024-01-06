import React, { useContext, useEffect, useState } from "react";
import style from'./Products.module.css'
import { CounterContext } from "../../Context/CounterContext";
import axios, { all } from "axios";
import{ColorRing} from 'react-loader-spinner' 
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";





export default function Products()
{

    let{addToCart}=useContext(CartContext);
     function getFeaturedProducts()
   {
        return  axios.get('https://ecommerce.routemisr.com/api/v1/products');
   }
   
     let{data,isLoading}=useQuery('featuredProducts',getFeaturedProducts);

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
   
    return<>   

<div className="container">
            <div className="row">
              {!isLoading?data.data.data.map((product,idx)=>{return <div className="col-md-2" key={idx}>
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
        <ColorRing
                visible={true}
                 height="80"
                 width="80"
                 ariaLabel="blocks-loading"
                 wrapperStyle={{}}
                 wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
       />
        </div>}
              

           </div>
        
           </div>
     </>
}






/*export default function Products()
{
   let[allProducts,setAllProducts]=useState(null);


   async function getAllProducts()
   {
     let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products');
     setAllProducts(data.data);
   }

    useEffect(function(){
      getAllProducts();
    },[]);

    return<>
      
        
         
    <div className="container">
            <div className="row">
              
              {allProducts!=null?allProducts.map((product,idx)=>{return <div className="col-md-2" key={idx}>
                 <div className="product p-3">
                    <img src={product.imageCover} alt="pro" className="w-100" />
                     <h6 className=" text-main fw-bolder">{product.category.name}</h6>
                     <h6 className=" fw-bolder">{product.title.split(' ').slice(0,2).join(' ')}</h6>
                     <div className="d-flex justify-content-between align-items-center">
                       <p className="fw-bolder">{product.price}EGP</p>
                       <p className=""><span ><i  className={`fa-solid fa-star ${style.starColor}`}></i></span>{product.ratingsAverage}</p>
                     </div>
                 </div>
              </div>}):<div className="vh-100  d-flex justify-content-center align-items-center">
        <ColorRing
                visible={true}
                 height="80"
                 width="80"
                 ariaLabel="blocks-loading"
                 wrapperStyle={{}}
                 wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
       />
        </div>}
              

           </div>
        
           </div>
     </>
}*/