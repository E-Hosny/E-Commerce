import React from "react";
import style from'./CategorySlider.module.css'
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




export default function CategorySlider()
{

  var settings = {
    dots: true,
    infinite: true,
    speed: 500, 
    slidesToShow: 7,
    slidesToScroll: 1
  };
     
      function getCategory()
      {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      }

      let{isError,isLoading,data}=useQuery('categorySlider',getCategory);

    return<>
    <div className="py-3">
       {data?.data.data ? <Slider {...settings}>{data.data.data.map((category)=><img src={category.image} key={category._id} height={200} />)} 
      </Slider> : ' ' }
    </div>
    
      
   
                
    </>
}