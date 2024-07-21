import React from 'react'
import { useSelector } from 'react-redux'
import SearchBar from '../../SearchBar'

export default function Header() {
    const { currentUser } = useSelector(state => state.user)

    return (
        <div className='h-[70px] bg-white fixed z-nav top-0 w-4/5 flex justify-between shadow-2xl'>
            <div className='p-2 w-96'>
                <SearchBar
                    placeholder={"Search..."}
                    onChange={() => {}}
                />
            </div>
            <div className='pr-4 my-auto' >
                <div className='font-medium text-xl mx-3 inline cursor-default'>
                    <i className="bi bi-bell mr-4 cursor-pointer"></i>
                    <span>{currentUser.name}</span>
                </div>
                <i className="bi bi-person-circle text-3xl"></i>
            </div>
        </div>
    )
}
