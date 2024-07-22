import React from 'react'

export const ToastWarning = ({info}) => {
    return (
        <div className='flex gap-2 bg-red-400 text-red-800 p-6 rounded-lg shadow-lg'>
            <i class="bi bi-x-circle text-4xl"></i>
            <div>
                <h1 className='font-bold'>Alert</h1>
                <p className='text-sm'>{info}</p>
            </div>
        </div>
    )
}

export const ToastSuccess = ({info}) => {
    return (
        <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
            <i class="bi bi-check2-circle text-4xl"></i>
            <div>
                <h1 className='font-bold'>Alert</h1>
                <p className='text-sm'>{info}</p>
            </div>
        </div>
    )
}
