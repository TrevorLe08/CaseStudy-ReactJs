import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts, updateCart } from '../../../service/cartService'
import { getProduct } from '../../../service/productService'
import { useNavigate } from 'react-router-dom'
import { handleChangeProduct, handleDeleteProduct } from '../../../utils/cartAction'
import {
    ButtonNormal,
    ButtonOutline
} from '../../../components/Button'
import { Modal } from '../../../components/Modal'
import { useToast } from '../../../context/ToastContext'

export default function YourCart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.cart)
    const { products } = useSelector(state => state.product)
    const { currentUser, isLogged } = useSelector(state => state.user)
    const yourCart = carts.find(item => item.user.username === currentUser.username)
    const [openModal, setOpenModel] = useState(false)
    const toast = useToast()

    const handleRemove = (p, cart) => {
        if (window.confirm("Bạn có chắc chắn muốn bỏ sản phẩm này?")) {
            const newCart = handleDeleteProduct(p, cart)
            dispatch(updateCart(newCart)).then(() => {
                toast.open(
                    <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                        <i class="bi bi-check2-circle text-4xl"></i>
                        <div>
                            <h1 className='font-bold'>Thông báo</h1>
                            <p className='text-sm'>Xóa sản phẩm thành công</p>
                        </div>
                    </div>
                )
            })
        }
    }
    const handleChange = (p, cart, action) => {
        const newCart = handleChangeProduct(p, products, cart, action)
        if (typeof newCart === "string") {
            alert(newCart)
        } else {
            dispatch(updateCart(newCart))
        }
    }
    const handleRemoveAll = () => {
        const newCart = {
            ...yourCart,
            total: 0,
            amount: 0,
            products: []
        }
        dispatch(updateCart(newCart)).then(() => {
            toast.open(
                <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                    <i class="bi bi-check2-circle text-4xl"></i>
                    <div>
                        <h1 className='font-bold'>Thông báo</h1>
                        <p className='text-sm'>Xóa hết giỏ hàng thành công</p>
                    </div>
                </div>
            )
            setOpenModel(false)
        })
    }

    useEffect(() => {
        const getData = () => {
            dispatch(getProduct())
            dispatch(getCarts())
        }
        getData()
    }, [dispatch])
    return (
        <div className='m-3'>
            {!isLogged ? <h2 className='text-center font-bold text-2xl mt-2'>Đăng nhập để mua hàng nhá bạn :v </h2>
                : (
                    <>
                        {currentUser.isAdmin ? <h2 className='text-center font-bold text-2xl mt-2'>Admin không tự mua hàng nha ní:v</h2>
                            : (
                                <>
                                    {yourCart.products.length === 0 ? (
                                        <div className='text-center font-bold text-2xl'>
                                            <h2>Giỏ hàng hiện đang trống</h2>
                                            <p className='cursor-pointer text-base font-medium' onClick={() => navigate("/store")}>🡠 Bắt đầu mua sắm</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <h2 className='text-xl font-medium'>Giỏ hàng của {yourCart.user.name}</h2>
                                                <div className='flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-2 xl:grid-cols-6 xl:gap-6 xl:mx-44'>
                                                    <div className='flex flex-col items-end w-auto px-2 md:col-span-2 xl:col-span-4'>
                                                        {yourCart.products.map((product, index) => (
                                                            <div
                                                                className='flex flex-row lg:max-w-2xl xl:max-w-4xl border-2 border-gray-400 rounded-lg shadow-xl w-full my-2'
                                                                key={index}
                                                            >
                                                                <div className='p-1'>
                                                                    <img src={product.image} alt="Demo products" className='w-32' />
                                                                </div>
                                                                <div className='px-2 my-auto mx-0 flex-1 lg:mx-12 md:mr-2'>
                                                                    <p
                                                                        className='text-2xl font-medium mb-2 cursor-pointer hover:underline'
                                                                        onClick={() => navigate(`/home/store/detail/${product.id}`)}
                                                                    >{product.name}</p>
                                                                    <p
                                                                        className='text-lg text-red-600 font-medium cursor-pointer mb-2'
                                                                        onClick={() => handleRemove(product, yourCart)}
                                                                    >
                                                                        <i className="bi bi-trash mr-2"></i>
                                                                        Xóa
                                                                    </p>
                                                                    <div className='flex justify-center items-center px-4 border-[1px] border-black rounded-md w-[100px]'>
                                                                        <button
                                                                            className='text-xl cursor-pointer font-medium'
                                                                            onClick={() => handleChange(product, yourCart, 'decrease')}
                                                                        >-</button>
                                                                        <span className='px-3 font-medium'>{product.quantity}</span>
                                                                        <button
                                                                            className='text-xl cursor-pointer font-medium'
                                                                            onClick={() => handleChange(product, yourCart, 'increase')}
                                                                        >+</button>
                                                                    </div>
                                                                </div>
                                                                <div className='p-2 flex justify-end items-center '>
                                                                    <p className='text-lg font-medium'>{product.price}k</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className='w-auto p-2 md:col-span-1 xl:col-span-2'>
                                                        <div className='border-2 border-gray-500 rounded-lg w-full px-3'>
                                                            <p className='text-xl font-bold text-center my-3'>Hóa đơn</p>
                                                            <div className='text-lg font-medium flex justify-between'>
                                                                <span>Tổng tiền:</span>
                                                                <span>{yourCart.total}.000 VNĐ</span>
                                                            </div>
                                                            <div className='text-lg font-medium flex justify-between'>
                                                                <span>Tổng số lượng:</span>
                                                                <span>{yourCart.amount}</span>
                                                            </div>
                                                            <div className='w-full grid'>
                                                                <ButtonNormal
                                                                    text="Thanh toán"
                                                                    bgColor="bg-tertiary"
                                                                    hoverClass="hover:bg-blue-600"
                                                                />
                                                            </div>
                                                            <p className='cursor-pointer mb-2 text-center text-tertiary hover:underline' onClick={() => navigate("/store")}>🡠 Tiếp tục mua hàng</p>
                                                        </div>
                                                        <div className='border-2 border-gray-500 rounded-lg w-full mt-6 px-2'>
                                                            <form onClick={(e) => e.preventDefault()}>
                                                                <label
                                                                    htmlFor='voucher'
                                                                    className="mb-2 block text-xl font-medium text-gray-900 my-3"
                                                                >Mã giảm giá</label>
                                                                <input
                                                                    type="text"
                                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-base outline-none text-gray-900 focus:ring-2 focus:ring-tertiary"
                                                                />
                                                                <div className='w-full grid'>
                                                                    <ButtonNormal
                                                                        text="Áp dụng mã giảm giá"
                                                                        bgColor="bg-tertiary"
                                                                        hoverClass="hover:bg-blue-600"
                                                                        onClick={() => alert("Không có áp mã được đâu:v")}
                                                                    />
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className='grid w-full mt-6'>
                                                            <ButtonOutline
                                                                text="Xóa tất cả sản phẩm"
                                                                border="border-red-500"
                                                                color="text-red-500"
                                                                hoverClass="hover:bg-red-600"
                                                                onClick={() => setOpenModel(true)}
                                                            />
                                                        </div>
                                                        <Modal open={openModal} onClose={() => setOpenModel(false)}>
                                                            <div className='text-center w-72 '>
                                                                <i className="bi bi-trash text-red-600 text-6xl mx-auto"></i>
                                                                <div className='mx-auto my-4 w-64'>
                                                                    <p className='text-lg font-bold'>
                                                                        Xác nhận xóa hết sản phẩm
                                                                    </p>
                                                                    <p className='text-sm text-gray-500 font-medium'>
                                                                        Bạn có chắc chắn sẽ xóa hết giỏ hàng này?
                                                                    </p>
                                                                    <div className='flex justify-center gap-4 mx-auto w-full mt-2'>
                                                                        <ButtonNormal
                                                                            text={"Xóa hết"}
                                                                            bgColor={"bg-red-500"}
                                                                            hoverClass={"hover:bg-red-700"}
                                                                            onClick={() => handleRemoveAll()}
                                                                        />
                                                                        <ButtonNormal
                                                                            text={"Hủy bỏ"}
                                                                            bgColor={"bg-gray-500"}
                                                                            hoverClass={"hover:bg-gray-700"}
                                                                            onClick={() => setOpenModel(false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                    </>
                )}
        </div>
    )
}
