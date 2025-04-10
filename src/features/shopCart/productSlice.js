import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchProducts=createAsyncThunk('products/fetchProducts',async()=>{
const response=await axios.get('https://api.escuelajs.co/api/v1/products');
return response.data;
})
const productSlice=createSlice({
    name:'products',
    initialState:{
        items:[],
        status:'idle'
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status='succeded',
            state.items=action.payload
        })
        .addCase(fetchProducts.rejected,(state)=>{
            state.status='failed'
        })
    }
})
export default productSlice.reducer;