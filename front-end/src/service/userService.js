import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const urlApi = "http://localhost:8000/users/"

export const loginUser = createAsyncThunk(
    'users/login',
    async (data,{rejectWithValue}) => {
        try {
            const res = await axios.post(urlApi + 'login', data)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const registerUser = createAsyncThunk(
    'users/register',
    async (data,{rejectWithValue}) => {
        try {
            const res = await axios.post(urlApi + 'register', data)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)
