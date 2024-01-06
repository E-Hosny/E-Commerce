import React, { useContext, useEffect } from "react";
import style from'./Layout.module.css'
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Offline, Online } from "react-detect-offline";




export default function Layout()
{

   let{setUserToken}=useContext(UserContext);
     //component did mount
   useEffect(()=>{
    if(localStorage.getItem('userToken')!=null)
    {
        setUserToken(localStorage.getItem('userToken'));
    }
    },[]);

    return<>
     
       <Navbar/>
       <div className="container">
           <Outlet></Outlet>
       </div>

       <div>
            <Offline>
                <div className="network">
                    <i className="fas fa-wifi"></i>
                    You Are Offline
                </div>
            </Offline>
       </div>
    </>
}