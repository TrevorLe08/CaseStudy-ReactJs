import React, { useEffect, useState } from 'react'

export const Carousel = ({
    children,
    autoSlide = false,
    autoSlideInterval = 3000,
}) => {
    const [current, setCurrent] = useState(0)

    const prevSlider = () => setCurrent(curr => curr === 0 ? children.length - 1 : curr - 1)
    const nextSlider = () => setCurrent(curr => curr === children.length - 1 ? 0 : curr + 1)

    useEffect(() => { // Auto slide carousel
        if (!autoSlide) return;
        const slideInterval = setInterval(nextSlider, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])
    return (
        <div className='overflow-hidden relative'>
            <div
                className='flex transition-transform ease-in-out duration-500'
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {children}
            </div>
            <div className='absolute inset-0 flex items-center justify-between '>
                <button
                    onClick={prevSlider}
                    className='px-2 py-1 rounded-full bg-transparent hover:bg-gray-300'
                >
                    <i class="bi bi-chevron-left text-2xl "></i>
                </button>
                <button
                    onClick={nextSlider}
                    className='px-2 py-1 rounded-full bg-transparent hover:bg-gray-300'
                >
                    <i class="bi bi-chevron-right text-2xl"></i>
                </button>
            </div>
            <div className='absolute bottom-4 right-0  left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {children.map((_, index) => (
                        <div
                            className={`
                            transition-all w-3 h-3 bg-gray-500 rounded-full cursor-pointer
                            ${current === index ? "p-1" : "bg-opacity-30"}
                        `}
                            onClick={() => setCurrent(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}
