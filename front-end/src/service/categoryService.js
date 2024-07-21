import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const urlApi = "http://localhost:8000/categories/"

export const getCategory = createAsyncThunk(
    'category/getCategory',
    async () => {
        const res = await axios.get(urlApi)
        return res?.data
    }
)
export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (data) => {
        const res = await axios.post(urlApi,data)
        return data
    }
)
export const readCategory = createAsyncThunk(
    'category/readCategory',
    async (id) => {
        const res = await axios.get(urlApi + id)
        return res?.data
    }
)
export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (data) => {
        const res = await axios.put(urlApi + data.id,data)
        return data
    }
)
export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id) => {
        const res = await axios.delete(urlApi + id)
        return id
    }
)