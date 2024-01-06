import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { axios } from 'axios';


export let getBrands=createAsyncThunk('brandSlice/getBrands',

  async ()=>{
    let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    return data.data ; 
  }

)



let initialState={brands:[] , loading:false , isError:null};


let brandSlice=createSlice({
    name:'brandSlice',
    initialState,

    extraReducers:{
    }

})