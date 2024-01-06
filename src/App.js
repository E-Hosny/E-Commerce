import React from "react";
import{Router, RouterProvider, createBrowserRouter}from'react-router-dom'
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import CounterContextProvider from "./Context/CounterContext";
import Home from "./Components/Home/Home";
import Login from './Components/Login/Login';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Navbar from "./Components/Navbar/Navbar";
import Notfound from './Components/Notfound/Notfound';
import Products from "./Components/Products/Products";
import Logout from './Components/Logout/Logout';
import UserContext, { userContext } from "./Context/UserContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import{QueryClient,QueryClientProvider} from 'react-query'
import{ReactQueryDevtools} from 'react-query/devtools'
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import toast, { Toaster } from 'react-hot-toast';
import Address from './Components/Address/Address';








let queryClient=new QueryClient();

let routers=createBrowserRouter([
 {path:'/',element:<Layout/>,children:[
  {index:true,element:<ProtectedRoute> <Home/> </ProtectedRoute>},
  {path:'login',element:<Login/>},
  {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:'address',element:<ProtectedRoute><Address/></ProtectedRoute>},
  {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:'register',element:<Register/>},
  {path:'*',element:<Notfound/>}
 ]}
]);

export default function App()
{
  return <>
      <QueryClientProvider client={queryClient}>

     <CartContextProvider>
         <UserContextProvider>
                <RouterProvider router={routers}></RouterProvider>
          </UserContextProvider>
      </CartContextProvider>

           <ReactQueryDevtools initialIsOpen='false' position='bottom-right'/>
           <Toaster/>

      </QueryClientProvider>
  </>
}