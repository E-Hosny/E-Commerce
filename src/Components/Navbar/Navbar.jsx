import React, { useContext } from "react";
import style from'./Navbar.module.css'
import {Link, useNavigate} from "react-router-dom";
import logo from '../../Assets/Images/freshcart-logo.svg'
import { UserContext } from "../../Context/UserContext";





export default function Navbar()
{
    let{userToken,setUserToken}=useContext(UserContext);
    let navigate=useNavigate();

     function logout()
     {
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/login');
     }
   
    return<> 
      <nav className="navbar navbar-expand bg-body-tertiary">
 <div className="container-fluid">
    <div className="collapse navbar-collapse d-flex align-items-center justify-content-center" id="navbarSupportedContent" >
      <ul className="navbar-nav me-auto mb-2 fw-bold test">
        <div className="myLogo">
           <img src={logo} alt="logo" className="px-3" />
        </div>
        <div className="myIcon">
          <i className="fab fa-facebook m-2 " ></i>
          <i className="fab fa-twitter m-2 " ></i>
          <i className="fab fa-instagram m-2 " ></i>
          <i className="fab fa-tiktok m-2 " ></i>
          <i className="fab fa-linkedin m-2 " ></i>
          <i className="fab fa-youtube m-2 " ></i>
        </div>
        
        

       {userToken!==null ?
       <>
           <li className="nav-item">
           <Link className="nav-link" to={'/'}>Home</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to={'products'}>Products</Link>
         </li>
    
         <li className="nav-item">
           <Link className="nav-link" to={'cart'}>Cart</Link>
         </li> </>:'' }
      </ul>
       
      
     <div>
       <ul className="navbar-nav ms-auto mb-2 fw-bold">

       {userToken!==null ? 
          <li className="nav-item">
          <span className="nav-link cursor-pointer" onClick={()=>logout()}>Logout</span>
         </li>
       : 
       <>
       <li className="nav-item">
        <Link className="nav-link" to={"/"}>Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"register"}>Register</Link>
      </li>
       </>}
      </ul>
     
    </div>
        
    </div>
   
  </div>
</nav>
  </>

 }


       