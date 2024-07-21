import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/SideBar'
import Header from '../../components/Header/admin'

export default function PageAdmin() {
  return (
    <div className='grid grid-cols-5 bg-gray-300'>
      <div className='col-span-1 h-screen w-1/5 bg-gray-900 fixed top-0 bottom-0 overflow-y-auto'>
        <SideBar />
      </div>
      <div className='col-end-6 col-span-4'>
        <Header />
        <div className='mt-20 min-h-[calc(100vh-80px)]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}