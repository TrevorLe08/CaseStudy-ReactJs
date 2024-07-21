import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const urlApi = "http://localhost:8000/products/";

export const getProduct = createAsyncThunk(
    'products/getProduct',
    async () => {
        const res = await axios.get(urlApi)
        return res?.data
    }
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (data) => {
        const res = await axios.post(urlApi,data) 
        return data
    }
)

export const readProduct = createAsyncThunk(
    'products/readProduct',
    async (id) => {
        const res = await axios.get(urlApi + id)
        return res?.data
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (data) => {
        console.log('data',data);
        const res = await axios.put(urlApi + data.id,data)
        return data
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        const res = await axios.delete(urlApi + id) 
        return id
    }
)

