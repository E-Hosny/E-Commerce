import React, { useContext, useState } from "react";
import style from'./Login.module.css'
import {Formik,useFormik}from 'formik';
import * as Yup from 'yup';
import { CounterContext } from "../../Context/CounterContext";
import {Link} from "react-router-dom";
import axios from 'axios'
import {Circles}from 'react-loader-spinner'
import {useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";




export default function Login()
{
  
  let[error,setError]=useState(null);
  let[isLoading,setIsLoading]=useState(false);
  let navigate=useNavigate();
  let{setUserToken}=useContext(UserContext);

  let validateSchema=Yup.object({
     email:Yup.string().email('email is invalid').required('email is required'),
     password:Yup.string().matches(/^[A-Z][a-z0-9]{5,20}$/,'password is invalid').required('password is required')
  }) 

  let formik=useFormik({
    initialValues:{
      email:'',
      password:'', 
    },
     validationSchema:validateSchema,
     onSubmit:sendLogin
  })

    async function sendLogin(values)
    {
      setIsLoading(true);
      let response=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
      setError(err.response.data.message);
      setIsLoading(false);
      });

      if(response.data.message=='success')
      {
        navigate('/');
        localStorage.setItem('userToken',response.data.token);
        setUserToken(response.data.token);
      }
    }

    return<>
         <div className="w-75 mx-auto py-3 fw-bold">
            <h2>Login Now :</h2>
             
            {error?<div className="alert alert-danger">{error}</div>:''}
            <form onSubmit={formik.handleSubmit}>
             <label htmlFor="email">email :</label>
             <input className="form-control" type="email" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {(formik.errors.email && formik.touched.email )?<div className="alert alert-danger p-1">{formik.errors.email}</div>:''}

             <label htmlFor="password">password :</label>
             <input className="form-control" type="password" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {(formik.errors.password && formik.touched.password )?<div className="alert alert-danger p-1">{formik.errors.password}</div>:''}

                {isLoading==false?
                <>
                <div className="d-flex align-items-center  mt-3">
                <button disabled={!(formik.isValid && formik.dirty)}  type="submit" className="btn bg-main text-white">Login</button>
                <Link to={'/register'} className="text-black mx-2 ">Register Now</Link>
                </div>
                
                </>: 
                  
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