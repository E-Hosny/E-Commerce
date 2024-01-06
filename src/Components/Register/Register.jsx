import React, { useContext, useState } from "react";
import style from'./Register.module.css'
import {Formik,useFormik}from 'formik';
import * as Yup from 'yup';
import { CounterContext } from "../../Context/CounterContext";
import axios from 'axios'
import {Circles}from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";



export default function Register()
{
   let[error,setError]=useState(null);
   let[isLoading,setIsLoading]=useState(false);
   let navigate=useNavigate();

  let validateSchema=Yup.object({
    name:Yup.string().min(3,'name min length is 3').max(15,'name max length is 15').required('name is required'),
    email:Yup.string().email('email is invalid').required('email is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,20}$/,'password is invalid').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'repassword is invalid').required('repassword is required'),
    phone:Yup.string().matches(/^(?:\+20|0)?1[0-2]\d{8}$/,'phone is invalid').required('phone is required')
  }) 

  let formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'', 
      rePassword:'',
      phone:''
    },
     validationSchema:validateSchema,
     onSubmit:sendRegesteration
  })

   async function sendRegesteration(values)
   {
      setIsLoading(true);
      let response=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
      setError(err.response.data.message);
      setIsLoading(false);
      });

      if(response.data.message==='success')
      {
        navigate('/login');
      }
   } 

    return<>
         <div className="w-75 mx-auto py-3 fw-bold">
            <h2>Register Now :</h2>
              {error?<div className="alert alert-danger">{error}</div>:''}
             <form onSubmit={formik.handleSubmit}>
             <label htmlFor="name">name :</label>
             <input className="form-control" type="text" id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {(formik.errors.name && formik.touched.name )?<div className="alert alert-danger p-1">{formik.errors.name}</div>:''}
             
             <label htmlFor="email">email :</label>
             <input className="form-control" type="email" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {(formik.errors.email && formik.touched.email )?<div className="alert alert-danger p-1">{formik.errors.email}</div>:''}

             <label htmlFor="password">password :</label>
             <input className="form-control" type="password" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {(formik.errors.password && formik.touched.password )?<div className="alert alert-danger p-1">{formik.errors.password}</div>:''}

             <label htmlFor="rePassword">rePassword :</label>
             <input className="form-control" type="password" id="rePassword" name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {(formik.errors.rePassword && formik.touched.rePassword )?<div className="alert alert-danger p-1">{formik.errors.rePassword}</div>:''}

             <label htmlFor="phone">phone :</label>
             <input className="form-control" type="tel" id="phone" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {(formik.errors.phone && formik.touched.phone )?<div className="alert alert-danger p-1">{formik.errors.phone}</div>:''}
               

               {isLoading==false? <button disabled={!(formik.isValid && formik.dirty)}  type="submit" className="btn bg-main text-white mt-3">Register</button>:
                  
                       <div className="mt-3">
                           <Circles
                          height="30"
                          width="100"
                          color="#4fa94d"
                         ariaLabel="circles-loading"
                          wrapperStyle={{}}
                         wrapperClass=""
                         visible={true}
                    />
                       </div>
                      
                     
                
                                    
               }
               
             
             </form>
         </div>
               
       
    </>
}