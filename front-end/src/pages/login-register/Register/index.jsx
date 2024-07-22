import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { InputLogin } from '../../../components/Input'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../service/userService'
import { useNavigate } from 'react-router-dom'
import { createCart } from '../../../service/cartService'
import { useToast } from '../../../context/ToastContext'
import * as Yup from 'yup'
import '../style.css'
import { ToastSuccess, ToastWarning } from '../../../components/Toast'

export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const registerSchema = Yup.object().shape({
        name: Yup.string()
            .required("*Required"),
        username: Yup.string()
            .required("*Required"),
        password: Yup.string()
            .min(8, "*Password must have 8 letter")
            .required("*Required"),
        confirmPassword: Yup.string()
            .required("*Required")
            .oneOf([Yup.ref('password'), null], "Password must match"),
        termAndConditions: Yup.bool()
            .oneOf([true], "*Accept for cookie :Đ")
    })

    return (
        <>

            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    termAndConditions: false,
                }}
                validationSchema={registerSchema}
                onSubmit={(values) => {
                    dispatch(registerUser(values)).then(({ payload }) => {
                        if (payload.message === "Username already exists") {
                            toast.open(
                                <ToastWarning info={"Username is existed"}/>
                            )
                        } else {
                            dispatch(createCart({
                                user: {
                                    id: payload.id,
                                    username: payload.username,
                                    name: payload.name,
                                    password: payload.password,
                                },
                                total: 0,
                                amount: 0,
                                products: [],
                            })).then(() => {
                                toast.open(
                                    <ToastSuccess info={"Sign up successfully"}/>
                                )
                                setTimeout(() => {navigate("/login")},1000)
                            })
                        }
                    })
                }}
            ><div className='min-h-screen flex items-center justify-center'>
                    <Form className='form-login'>
                        <p className='bg-transparent text-center text-3xl text-gray-100 mb-1 font-barlow font-medium'>Create new account</p>
                        <p className='bg-transparent text-sm text-gray-100 mb-[15px]'>
                            Already have an account?
                            <span
                                className='text-tertiary font-medium cursor-pointer ml-2'
                                onClick={() => navigate("/login")}
                            >Login here</span>
                        </p>
                        <div className='grid md:grid-cols-2 md:gap-x-4'>
                            <InputLogin
                                name={"name"}
                                label={"Name"}
                                type={"text"}
                            />
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
                            <InputLogin
                                name={"confirmPassword"}
                                label={"Confirm password"}
                                type={"password"}
                            />
                        </div>
                        <div>
                            <Field type="checkbox" name="termAndConditions" className='size-[13px] focus:ring-blue-500 focus:ring-2 mr-2' />
                            <span className='bg-transparent text-sm text-gray-100'>
                                I accept the
                                <span
                                    className='text-tertiary font-medium cursor-pointer mx-1'
                                    onClick={() => alert("Hàng minh họa không có điều khoản:v")}
                                >Term</span>
                                and
                                <span
                                    className='text-tertiary font-medium cursor-pointer mx-1'
                                    onClick={() => alert("Chả có quyền riêng tư gì ở đây cả:))")}
                                >Conditions</span>
                            </span>
                            <p className='text-base text-red-600 mt-2'>
                                <ErrorMessage name="termAndConditions" />
                            </p>
                        </div>
                        <button className='btn-form-login' type='submit'>Create an account</button>
                    </Form>
                </div>
            </Formik>
        </>
    )
}
