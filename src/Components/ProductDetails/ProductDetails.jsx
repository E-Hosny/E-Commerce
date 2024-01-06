import React, { useContext } from "react";
import style from'./ProductDetails.module.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';




export default function ProductDetails()
{

    let{addToCart}=useContext(CartContext);
    let param = useParams();

    function getProductDetails(id)
    {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

     async function addProductToCart(pId)
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
    
    let {data,isError,isLoading} =useQuery('productDetails',()=>getProductDetails(param.id));


    return<>
        
        {data?.data.data ? 
        <div className="row py-2">
          <Helmet>
                <title>{data?.data.data.title}</title>
                <meta name="description" content=""/>
            </Helmet>
          <div className="col-md-4">
            <img src={data?.data.data.imageCover} alt={data?.data.data.title} className="w-100"/>
          </div>
          
          <div className="col-md-8 py-5">
            <h2 className="h5">{data?.data.data.title}</h2>
            <p>{data?.data.data.description}</p>
            <h6 className="text-main">{data?.data.data.category.name}</h6>
            <h6 className="text-main">price : {data?.data.data.price} EGP</h6>
            <div className="d-flex justify-content-between">
              <span>Rating Quantity : {data?.data.data.ratingsQuantity}</span>
              <span><i className="fas fa-star rating-color"></i>{data?.data.data.ratingsAverage}</span>
            </div>

            <button className="btn bg-main text-white w-100 mt-2" onClick={()=>addProductToCart(data?.data.data.id)}>Add to cart</button>
          </div>

        </div> : ' '}
       
         </>
}