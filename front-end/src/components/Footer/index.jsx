import React from 'react'
import { footerLinks, socialMedia } from '../../utils/constant'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-gray-900 sm:px-16 px-8 sm:pt-24 pt-12 pb-8'>
            <footer className='max-container'>
                <div className='flex justify-between items-start gap-20 flex-wrap max-lg:flex-col'>
                    <div className='flex flex-col items-start '>
                        <Link className='text-white font-barlow font-bold text-3xl' to="/">Online shopping</Link>
                        <p className='text-white mt-6 text-base leading-7 sm:max-w-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus adipisci in corporis perferendis consequuntur aperiam repudiandae cumque. Sit ullam quasi iure! Qui, et. Cum, velit fugit est sed suscipit vel.</p>
                        <div className='flex items-center gap-5 mt-8'>
                            {socialMedia.map((item, index) => (
                                <div className='flex justify-center items-center bg-white rounded-full px-2 py-1 cursor-pointer' key={index}>
                                    <i className={`bi ${item.img} text-2xl`}></i>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap'>
                        {footerLinks.map((item, index) => (
                            <div key={index}>
                                <h2 className='text-white text-2xl leading-normal mb-6'>{item.title}</h2>
                                <ul>
                                    {item.links.map((url, i) => (
                                        <li className='mt-3 text-white text-base leading-normal' key={i}>
                                            <Link to={url.link}>{url.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
