import React, { useEffect } from "react";
import style from'./Categories.module.css'
import { ReactDOM } from 'react-dom/client';
import { useQuery } from "react-query";
import axios from "axios";
import { Helmet } from "react-helmet";





export default function Categories()
{
    

  function getCategory()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let{isError,isLoading,data}=useQuery('categorySlider',getCategory);


    return<>
            <div>

    <Helmet>

      <title>category</title>
    </Helmet>

    <div className='row my-3'>
      <i className='fa-solid  fa-5x'></i>
      {data?.data.data.map((el) => {
        return <div className='col-md-3'>
          <img src={el.image} className="w-100 smallImg" alt="" />
          <h5>{el.name}</h5>
        </div>
      })}

    </div>
    </div>
      
        </>
}