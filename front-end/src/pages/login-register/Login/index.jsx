import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../service/userService'
import { useNavigate } from 'react-router-dom'
import { getCarts } from '../../../service/cartService'
import { getProduct } from '../../../service/productService'
import { getItem } from '../../../redux/slices/productsSlice'
import { getCategory } from '../../../service/categoryService'
import { InputLogin } from '../../../components/Input'
import { useToast } from '../../../context/ToastContext'
import { ToastSuccess, ToastWarning } from '../../../components/Toast'
import * as Yup from 'yup'
import '../style.css'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required("*Required"),
        password: Yup.string()
            .required("*Required")
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
                                <ToastWarning info={"Password or username is wrong"} />
                            )
                        } else {
                            toast.open(
                                <ToastSuccess info={"Log in successfully"} />
                            )
                            setTimeout(() => {
                                payload.user.isAdmin ? navigate("/admin") : navigate("/")
                            }, 1000)
                        }
                    })
                }}
            >
                <div className='min-h-screen flex items-center justify-center'>
                    <Form className='form-login'>
                        <p className='bg-transparent text-center text-3xl text-gray-100 mb-[15px] font-barlow'>Log in</p>
                        <InputLogin
                            name={"username"}
                            label={"Username"}
                            type={"text"}
                        />
                        <InputLogin
                            name={"password"}
                            label={"Password"}
                            type={"password"}
                        />
                        <button className='btn-form-login' type='submit'>Log in</button>
                        <p className='bg-transparent text-sm text-gray-100 mt-4'>
                            Dont't have an account yet?
                            <span
                                className='text-tertiary font-medium cursor-pointer ml-2'
                                onClick={() => navigate("/register")}
                            >Register here</span>
                        </p>
                    </Form>
                </div>
            </Formik>
        </>
    )
}
