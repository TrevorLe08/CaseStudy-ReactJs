import React from 'react'
import { ButtonGradient } from '../Button'

export const CardPopular = ({ images, name, price, onClick }) => {
    return (
        <div
            className='flex flex-1 flex-col w-full max-sm:w-full cursor-pointer'
            onClick={onClick}
        >
            <img src={images[0]} alt={name} className='w-[280px] border-2 border-gray-100 rounded-lg shadow-lg' />
            <h1 className='mt-2 text-2xl leading-normal font-medium'>{name}</h1>
            <p className='font-semibold text-primary font-barlow text-lg'>{price}.000 VND</p>
        </div>
    )
}

export const CardStore = ({ img,name,price,onAdd,onView }) => {
    return (
        <div className='max-w-[300px] mb-[10px] text-center p-[10px] border-[1px] border-[#c3c3c3] shadow-card rounded-[8px] cursor-pointer mx-auto'>
            <img className="w-[200px] rounded-lg ml-auto mr-auto" src={img} alt="Card product" />
            <h2 className='text-xl font-bold'>{name}</h2>
            <h2 className='text-xl font-bold mb-2'>{price}.000 VNĐ</h2>
            <ButtonGradient
                text={"Thêm"}
                bgFrom={"from-blue-500"}
                bgTo={"to-blue-700"}
                onClick={onAdd}
            />
            <ButtonGradient
                text={"Chi tiết"}
                bgFrom={"from-green-400"}
                bgTo={"to-green-500"}
                onClick={onView}
            />
        </div>
    )
}


