import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getCarts } from '../../service/cartService'
import { logOut } from '../../redux/slices/usersSlice'
import { ButtonNormal, ButtonOutline } from '../Button'
import { Modal } from '../Modal'
import { useToast } from '../../context/ToastContext'
import { ToastSuccess } from '../Toast'

export default function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser, isLogged } = useSelector(state => state.user)
    const { carts } = useSelector(state => state.cart)
    const [isNav, setIsNav] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const toast = useToast()
    const yourCart = carts.find(cart => cart.user.username === currentUser.username)
    const navigation = [
        {
            label:
                <span>
                    Home
                    <i className="bi bi-house-door ml-2"></i>
                </span>,
            link: '/'
        }, {
            label:
                <span>
                    Store
                    <i className="bi bi-shop ml-2"></i>
                </span>,
            link: '/store'
        }, {
            label:
                <span>
                    Cart
                    <i className="bi bi-cart ml-2"></i>
                    <span className='ml-1 pl-1'>{isLogged && !currentUser.isAdmin && yourCart.amount}</span>
                </span>,
            link: '/your-cart'
        }
    ]

    useEffect(() => {
        const getData = () => {
            dispatch(getCarts())
        }
        getData()
    }, [dispatch])
    return (
        <div className='w-full fixed top-0 z-nav bg-gray-900 shadow-xl'>
            <div className='md:flex py-4 md:px-10 px-7 items-center justify-between bg-gray-900'>
                <div className='text-white text-2xl font-barlow cursor-pointer flex items-center'>
                    {isLogged ? (
                        <>
                            <i className="bi bi-person-circle mr-2" />
                            <span className='mr-2'>{currentUser.name}</span>
                            <ButtonOutline
                                textColor={"text-red-600"}
                                border={"border-red-600"}
                                hoverClass={"hover:bg-red-600"}
                                onClick={() => setOpenModal(true)}
                                className={'font-barlow'}
                            >
                                Log out
                            </ButtonOutline>

                            {currentUser.isAdmin ? (
                                <div className='mx-2'>
                                    <ButtonOutline
                                        className={"font-barlow"}
                                        onClick={() => navigate("/admin")}
                                    >
                                        Page Admin
                                    </ButtonOutline>
                                </div>
                            ) : ""}
                        </>
                    ) : (
                        <div className='space-x-2'>
                            <ButtonOutline
                                className={"font-barlow"}
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </ButtonOutline>
                            <ButtonOutline
                                className={"font-barlow"}
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </ButtonOutline>
                        </div>
                    )}

                </div>
                <div className='cursor-pointer md:hidden' onClick={() => setIsNav(!isNav)}>
                    <i class="bi bi-list text-white text-3xl absolute right-8 top-3 px-2 py-1 rounded-md hover:bg-gray-700"></i>
                </div>
                <nav>
                    <ul className={`md:flex md:item-center absolute md:static bg-gray-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in ${isNav ? "top-11 opacity-100" : "top-[-200px]"} md:opacity-100 opacity-0`}>
                        {navigation.map((item, index) => (
                            <li className='md:ml-8 text-lg my-7 md:my-0' key={index}>
                                <Link
                                    to={item.link}
                                    className="text-white pb-2 transition duration-200 ease-in-out hover:text-tertiary hover:border-b-2 hover:border-b-tertiary"
                                >
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <div className='text-center w-72 '>
                        <i className="bi bi-box-arrow-left text-red-600 text-6xl mx-auto"></i>
                        <div className='mx-auto my-4 w-64'>
                            <p className='text-lg font-bold'>
                                Confirm log out
                            </p>
                            <p className='text-sm text-gray-500 font-medium'>
                                Are you sure want to log out?
                            </p>
                            <div className='flex justify-center gap-4 mx-auto w-full mt-2'>
                                <ButtonNormal
                                    bgColor={"bg-red-500"}
                                    hoverClass={"hover:bg-red-700"}
                                    onClick={() => {
                                        dispatch(logOut())
                                        toast.open(
                                            <ToastSuccess info={"Log out successfully"}/>
                                        )
                                        setOpenModal(false)
                                    }}
                                >
                                    Log out
                                </ButtonNormal>
                                <ButtonNormal
                                    bgColor={"bg-gray-500"}
                                    hoverClass={"hover:bg-gray-700"}
                                    onClick={() => setOpenModal(false)}
                                >
                                    Cancel
                                </ButtonNormal>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
