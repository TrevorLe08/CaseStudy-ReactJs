import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../../redux/slices/usersSlice'
import { Modal } from '../Modal'
import { ButtonNormal } from '../Button'
import { sideBarList } from '../../utils/constant'
import { useToast } from '../../context/ToastContext'
import './style.css'

export default function SideBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const [openModal, setOpenModal] = useState(false)

    return (
        <div>
            <p className='text-center text-white font-bold font-barlow text-2xl mt-2 mb-3'>
                Page Admin
            </p>
            <hr className='w-auto mx-2 border-gray-500' />
            <nav className="flex flex-col">
                {sideBarList.map((item, index) => (
                    <div className='sidebar-item hover:text-tertiary' key={index}>
                        <Link to={item.link}>
                            <i className={`bi ${item.icon} mr-2`}></i>
                            {item.label}
                        </Link>
                    </div>
                ))}

                <hr className='w-auto mx-2 border-gray-500' />

                <div className='sidebar-item mb-0 hover:text-tertiary'>
                    <div onClick={() => alert("Coming soon:)")}>
                        <i className="bi bi-gear mr-2"></i>
                        Setting
                    </div>
                </div>
                <div
                    className='sidebar-item hover:text-red-600'
                    onClick={() => setOpenModal(true)}
                >
                    <i className="bi bi-box-arrow-left mr-2"></i>
                    Log out
                </div>
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
                                    toast.open(
                                        <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                                            <i class="bi bi-check2-circle text-4xl"></i>
                                            <div>
                                                <h1 className='font-bold'>Alert</h1>
                                                <p className='text-sm'>Log out successfully</p>
                                            </div>
                                        </div>
                                    )
                                    dispatch(logOut())
                                    navigate("/login")
                                    setTimeout(() => {
                                        setOpenModal(false)
                                    }, 1000)
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
    )
}
