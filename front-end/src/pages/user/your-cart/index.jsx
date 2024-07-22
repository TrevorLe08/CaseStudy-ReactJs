import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts, updateCart } from '../../../service/cartService'
import { getProduct } from '../../../service/productService'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../../../components/Modal'
import { useToast } from '../../../context/ToastContext'
import {
    handleChangeProduct,
    handleDeleteProduct
} from '../../../utils/cartAction'
import {
    ButtonNormal,
    ButtonOutline
} from '../../../components/Button'
import { 
    ToastSuccess, 
    ToastWarning 
} from '../../../components/Toast'

export default function YourCart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.cart)
    const { products } = useSelector(state => state.product)
    const { currentUser, isLogged } = useSelector(state => state.user)
    const [openModal, setOpenModel] = useState(false)
    const toast = useToast()
    const yourCart = carts.find(item => item.user.username === currentUser.username)

    const handleRemove = (p, cart) => {
        if (window.confirm("Bạn có chắc chắn muốn bỏ sản phẩm này?")) {
            const newCart = handleDeleteProduct(p, cart)
            dispatch(updateCart(newCart)).then(() => {
                toast.open(
                    <ToastSuccess info={"Delete product successfully"}/>
                )
            })
        }
    }
    const handleChange = (p, cart, action) => {
        const newCart = handleChangeProduct(p, products, cart, action)
        if (typeof newCart === "string") {
            toast.open(
                <ToastWarning info={newCart}/>
            )
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
                <ToastSuccess info={"Clear cart successfully"}/>
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
            {!isLogged ? <h2 className='text-center font-bold text-2xl mt-2'>Log in to discover products </h2>
                : (
                    <>
                        {currentUser.isAdmin ? <h2 className='text-center font-bold text-2xl mt-2'>Admin cannot buy yourself products:v</h2>
                            : (
                                <>
                                    {yourCart.products.length === 0 ? (
                                        <div className='text-center font-bold text-2xl'>
                                            <h2>Your cart is empty</h2>
                                            <p className='cursor-pointer text-base font-medium' onClick={() => navigate("/store")}>🡠 Start shopping</p>
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
                                                                        Delete
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
                                                            <p className='text-xl font-bold text-center my-3'>Order summary</p>
                                                            <div className='text-lg font-medium flex justify-between'>
                                                                <span>Total price:</span>
                                                                <span>{yourCart.total}.000 VNĐ</span>
                                                            </div>
                                                            <div className='text-lg font-medium flex justify-between'>
                                                                <span>Total amount:</span>
                                                                <span>{yourCart.amount}</span>
                                                            </div>
                                                            <div className='w-full grid'>
                                                                <ButtonNormal
                                                                    bgColor="bg-tertiary"
                                                                    hoverClass="hover:bg-blue-600"
                                                                >
                                                                    Check out
                                                                </ButtonNormal>
                                                            </div>
                                                            <p className='cursor-pointer mb-2 text-center text-tertiary hover:underline' onClick={() => navigate("/store")}>🡠 Continue shopping</p>
                                                        </div>
                                                        <div className='border-2 border-gray-500 rounded-lg w-full mt-6 px-2'>
                                                            <form onClick={(e) => e.preventDefault()}>
                                                                <label
                                                                    htmlFor='voucher'
                                                                    className="mb-2 block text-xl font-medium text-gray-900 my-3"
                                                                >Voucher or gift card</label>
                                                                <input
                                                                    type="text"
                                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-base outline-none text-gray-900 focus:ring-2 focus:ring-tertiary"
                                                                />
                                                                <div className='w-full grid'>
                                                                    <ButtonNormal
                                                                        bgColor="bg-tertiary"
                                                                        hoverClass="hover:bg-blue-600"
                                                                        onClick={() => alert("Không có áp mã được đâu:v")}
                                                                    >
                                                                        Apply
                                                                    </ButtonNormal>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className='grid w-full mt-6'>
                                                            <ButtonOutline
                                                                border="border-red-500"
                                                                textColor="text-red-500"
                                                                hoverClass="hover:bg-red-600"
                                                                className={"py-2"}
                                                                onClick={() => setOpenModel(true)}
                                                            >
                                                                Clear your cart
                                                            </ButtonOutline>
                                                        </div>
                                                        <Modal open={openModal} onClose={() => setOpenModel(false)}>
                                                            <div className='text-center w-72 '>
                                                                <i className="bi bi-trash text-red-600 text-6xl mx-auto"></i>
                                                                <div className='mx-auto my-4 w-64'>
                                                                    <p className='text-lg font-bold'>
                                                                        Confirm clear cart
                                                                    </p>
                                                                    <p className='text-sm text-gray-500 font-medium'>
                                                                        Are you sure want to clear cart
                                                                    </p>
                                                                    <div className='flex justify-center gap-4 mx-auto w-full mt-2'>
                                                                        <ButtonNormal
                                                                            bgColor={"bg-red-500"}
                                                                            hoverClass={"hover:bg-red-700"}
                                                                            onClick={() => handleRemoveAll()}
                                                                        >
                                                                            Clear
                                                                        </ButtonNormal>
                                                                        <ButtonNormal
                                                                            bgColor={"bg-gray-500"}
                                                                            hoverClass={"hover:bg-gray-700"}
                                                                            onClick={() => setOpenModel(false)}
                                                                        >
                                                                            Cancel
                                                                        </ButtonNormal>
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
