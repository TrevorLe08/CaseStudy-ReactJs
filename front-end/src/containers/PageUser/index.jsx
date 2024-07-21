import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';

export default function PageUser() {
    return (
        <div className='user-container'>
            <NavBar />
            <div className='pt-[76px]'>
                <Outlet />
            </div>
        </div>
    )
}
