import React, { useContext } from "react";
import style from'./Address.module.css'
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";


export default function Address()
{
   let{onlinePayment,cartId}=useContext(CartContext);

  async function handleAddressSubmit(values)
  {
    console.log('submitted');
      let response=await onlinePayment(cartId,'http://localhost:3000',values);
      window.location.href=response?.data.session.url;
  }

  let formik = useFormik({
    initialValues:{
      details:'' , 
      phone:'',
      city:''
    },

    onSubmit:handleAddressSubmit
  })

    return<>
       <div className="container mt-5">
          <form onSubmit={formik.handleSubmit}>
            
            
            <label htmlFor="details">details : </label>
            <input type="text" id="details" className="form-control" name="details" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} />

            <label htmlFor="phone">phone : </label>
            <input type="tel" id="phone" className="form-control" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} />
            
            <label htmlFor="city">city : </label>
            <input type="text" id="city" className="form-control" name="city" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} />

            <button type="submit" className="btn bg-main my-3 text-white">pay now</button>

          </form>
       </div>
         </>
}