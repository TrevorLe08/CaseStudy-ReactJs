import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { InputLogin } from '../../../components/Input'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../service/userService'
import { useNavigate } from 'react-router-dom'
import { createCart } from '../../../service/cartService'
import * as Yup from 'yup'
import '../style.css'
import { useToast } from '../../../context/ToastContext'

export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const registerSchema = Yup.object().shape({
        name: Yup.string()
            .required("*Bắt buộc"),
        username: Yup.string()
            .required("*Bắt buộc"),
        password: Yup.string()
            .min(8, "*Mật khẩu cần dài hơn 8 kí tự")
            .required("*Bắt buộc"),
        confirmPassword: Yup.string()
            .required("*Bắt buộc")
            .oneOf([Yup.ref('password'), null], "Mật khẩu phải giống nhau"),
        termAndConditions: Yup.bool()
            .oneOf([true], "*Đồng ý đi nào :v")
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
                                <div className='flex gap-2 bg-red-400 text-red-800 p-6 rounded-lg shadow-lg'>
                                    <i class="bi bi-x-circle text-4xl"></i>
                                    <div>
                                        <h1 className='font-bold'>Thông báo</h1>
                                        <p className='text-sm'>Tài khoản đã tồn tại</p>
                                    </div>
                                </div>
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
                                products: [],
                            })).then(() => {
                                toast.open(
                                    <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                                        <i class="bi bi-check2-circle text-4xl"></i>
                                        <div>
                                            <h1 className='font-bold'>Thông báo</h1>
                                            <p className='text-sm'>Đăng ký thành công</p>
                                        </div>
                                    </div>
                                )
                                setTimeout(() => {navigate("/login")},1000)
                            })
                        }
                    })
                }}
            ><div className='min-h-screen flex items-center justify-center'>
                    <Form className='form-login'>
                        <p className='bg-transparent text-3xl text-gray-100 mb-1 font-barlow font-medium'>Tạo tài khoản mới để nhận 60 tỷ</p>
                        <p className='bg-transparent text-sm text-gray-100 mb-[15px]'>
                            Bạn đã có tài khoản?
                            <span
                                className='text-tertiary font-medium cursor-pointer ml-2'
                                onClick={() => navigate("/login")}
                            >Đăng nhập tại đây</span>
                        </p>
                        <div className='grid md:grid-cols-2 md:gap-x-4'>
                            <InputLogin
                                name={"name"}
                                label={"Họ và tên"}
                                type={"text"}
                            />
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
                            <InputLogin
                                name={"confirmPassword"}
                                label={"Xác nhận mật khẩu"}
                                type={"password"}
                            />
                        </div>
                        <div>
                            <Field type="checkbox" name="termAndConditions" className='w-3 h-3 focus:ring-blue-500 focus:ring-2 mr-2' />
                            <span className='bg-transparent text-sm text-gray-100'>
                                Bạn cần đồng ý
                                <span
                                    className='text-tertiary font-medium cursor-pointer mx-1'
                                    onClick={() => alert("Hàng minh họa không có điều khoản:v")}
                                >Điều khoản</span>
                                và
                                <span
                                    className='text-tertiary font-medium cursor-pointer mx-1'
                                    onClick={() => alert("Chả có quyền riêng tư gì ở đây cả:))")}
                                >Quyền riêng tư</span>
                            </span>
                            <p className='text-base text-red-600 mt-2'>
                                <ErrorMessage name="termAndConditions" />
                            </p>
                        </div>
                        <button className='btn-form-login' type='submit'>Tạo tài khoản mới</button>
                    </Form>
                </div>
            </Formik>
        </>
    )
}
