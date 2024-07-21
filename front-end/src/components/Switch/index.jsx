import React from 'react'
import PropTypes from 'prop-types'

const Switch = props => {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={props.isOn} onChange={props.onChange}/>
            <div className="relative w-11 h-6 rounded-full bg-gray-200 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="text-xl ms-1 font-medium text-gray-900">{props.label}</span>
        </label>
    )
}

Switch.propTypes = {
    label: PropTypes.string,
    isOn: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Switch
