import React from 'react'

export const ButtonNormal = ({bgColor, onClick, textColor, children,hoverClass, className}) => {
    return (
        <button
            className={`px-3 py-2 ${bgColor || "bg-blue-500"} ${hoverClass || "hover:bg-blue-700"} ${textColor || "text-white"} font-medium rounded my-2 ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export const ButtonOutline = ({textColor,border,hoverClass,className,onClick,children}) => {
    return (
        <button
            className={`"font-sans" bg-transparent ${textColor || "text-blue-500"} border-2 ${border || "border-blue-500"} rounded-md font-medium cursor-pointer py-1 px-2 transition ease-in-out ${hoverClass || "hover:bg-blue-600"} hover:text-white ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export const ButtonGradient = ({bgFrom,bgTo,onClick,className,children}) => {
    return (
        <button
            className={`mx-1 px-2 py-2 text-lg text-white rounded bg-gradient-to-r ${bgFrom || "from-blue-500"} ${bgTo || "to-blue-700"} hover:bg-gradient-to-br focus:outline-none ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}