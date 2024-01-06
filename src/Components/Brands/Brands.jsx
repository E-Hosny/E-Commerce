import React, { useEffect } from "react";
import style from'./Brands.module.css'
import axios from "axios";


export default function Brands()
{

   async function getData()
    {
      let x=await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      console.log(x);
    }

     useEffect(()=>{
      getData();
     }
     ,[]);

    return<>
     
      <h2>Brands</h2>
    </>
}