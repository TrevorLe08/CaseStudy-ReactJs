import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../service/userService'
import { useNavigate } from 'react-router-dom'
import { getCarts } from '../../../service/cartService'
import { getProduct } from '../../../service/productService'
import { getItem } from '../../../redux/slices/productsSlice'
import { getCategory } from '../../../service/categoryService'
import {InputLogin} from '../../../components/Input'
import { useToast } from '../../../context/ToastContext'
import * as Yup from 'yup'
import '../style.css'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required("*Bắt buộc"),
        password: Yup.string()
            .required("*Bắt buộc")
    })

    useEffect(() => {
        const getData = () => {
            dispatch(getCarts())
            dispatch(getProduct())
            dispatch(getItem())
            dispatch(getCategory())
        }
        getData()
    }, [dispatch])
    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                    dispatch(loginUser(values)).then(({ payload }) => {
                        if (payload.message === "Invalid username or password") {
                            toast.open(
                                <div className='flex gap-2 bg-red-400 text-red-800 p-6 rounded-lg shadow-lg'>
                                    <i class="bi bi-x-circle text-4xl"></i>
                                    <div>
                                        <h1 className='font-bold'>Thông báo</h1>
                                        <p className='text-sm'>Mật khẩu hoặc username không đúng</p>
                                    </div>
                                </div>
                            )
                        } else {
                            toast.open(
                                <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                                    <i class="bi bi-check2-circle text-4xl"></i>
                                    <div>
                                        <h1 className='font-bold'>Thông báo</h1>
                                        <p className='text-sm'>Đăng nhập thành công</p>
                                    </div>
                                </div>
                            )
                            setTimeout(() => {
                                payload.user.isAdmin ? navigate("/admin") : navigate("/")
                            },1000)
                        }
                    })
                }}
            >
                <div className='min-h-screen flex items-center justify-center'>
                    <Form className='form-login'>
                        <p className='bg-transparent text-3xl text-gray-100 mb-[15px] font-barlow'>Đăng nhập để xài nốt 60 tỷ còn lại</p>
                        <InputLogin
                            name={"username"}
                            label={"Tên đăng nhập"}
                            type={"text"}
                        />
                        <InputLogin
                            name={"password"}
                            label={"Mật khẩu"}
                            type={"password"}
                        />
                        <button className='btn-form-login' type='submit'>Đăng nhập</button>
                        <p className='bg-transparent text-sm text-gray-100 mt-4'>
                            Bạn chưa có tài khoản?
                            <span
                                className='text-tertiary font-medium cursor-pointer ml-2'
                                onClick={() => navigate("/register")}
                            >Đăng ký tại đây</span>
                        </p>
                    </Form>
                </div>
            </Formik>
        </>
    )
}
