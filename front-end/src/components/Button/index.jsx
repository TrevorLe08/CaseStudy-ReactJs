import React from 'react'
import PropTypes from 'prop-types'

export const ButtonNormal = props => {
    return (
        <button
            className={`px-3 py-2 ${props.bgColor || "bg-blue-500"} ${props.hoverClass || "hover:bg-blue-700"} ${props.textColor || "text-white"} font-medium rounded my-2`}
            onClick={props.onClick}
        >
            <span>{props.text}</span>
        </button>
    )
}

export const ButtonOutline = props => {
    return (
        <button
            className={`${props.font || "font-sans"} bg-transparent ${props.color || "text-blue-500"} border-2 ${props.border || "border-blue-500"} rounded-md font-medium cursor-pointer py-1 px-2 transition ease-in-out ${props.hoverClass || "hover:bg-blue-600"} hover:text-white`}
            onClick={props.onClick}
        >
            <span>{props.text}</span>
        </button>
    )
}

export const ButtonGradient = props => {
    return (
        <button
            className={`mx-1 px-2 py-2 text-lg text-white rounded bg-gradient-to-r ${props.bgFrom || "from-blue-500"} ${props.bgTo || "to-blue-700"} hover:bg-gradient-to-br focus:outline-none`}
            onClick={props.onClick}
        >
            <span>{props.text}</span>
        </button>
    )
}

ButtonNormal.propTypes = {
    bgColor: PropTypes.string,
    hoverClass: PropTypes.string,
    textColor: PropTypes.string,
    onClick: PropTypes.func,
}

ButtonOutline.propTypes = {
    font: PropTypes.string,
    color: PropTypes.string, 
    border: PropTypes.string,
    hoverClass: PropTypes.string,
    onClick: PropTypes.func,
}

ButtonGradient.propTypes = {
    bgFrom: PropTypes.string,
    bgTo: PropTypes.string,
    onClick: PropTypes.func,
}