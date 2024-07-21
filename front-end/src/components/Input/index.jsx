import React from 'react'
import { Field, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'

export const InputLogin = (props) => {
    return (
        <div className='relative z-0 w-full mb-4 group'>
            <Field
                type={props.type}
                name={props.name}
                className="block py-2.5 px-0 w-full text-base text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-tertiary focus:text-tertiary peer"
                placeholder=" "
                autoComplete='off'
            />
            <label
                htmlFor={props.name}
                className="peer-focus:font-medium absolute text-base text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-tertiary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >{props.label}</label>
            <p className='text-base text-red-600 mt-2'>
                <ErrorMessage name={props.name} />
            </p>
        </div>
    )
}

export const InputForm = (props) => {
    return (
        <div>
            <label
                htmlFor={props.name}
                className={`text-lg font-medium ${props.className}`}
            >
                {props.label}
            </label>
            <Field
                className="px-2 py-2 mb-2 border-b-2 border-b-gray-600 outline-0 placeholder:text-gray-600 transition duration-200 ease-in-out 
                focus:border-b-primary focus:placeholder:text-primary w-56 focus:text-primary [appearance:textfield] 
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-outer-spin-button]:m-0 
                [&::-webkit-inner-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:m-0"
                name={props.name}
                placeholder={props.placeholder}
                type={props.type}
                disabled={props.disabled}
            />
        </div>
    )
}

InputLogin.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
}

InputForm.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
}