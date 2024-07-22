import React, { forwardRef } from 'react'

const SearchBar = forwardRef(({placeholder,onChange}, ref) => {
    return (
        <div className="max-w-96 md:w-auto">
            <form className="w-full mx-auto" onSubmit={e => e.preventDefault()}>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i className="bi bi-search text-xl text-gray-500"></i>
                    </div>
                    <input
                        type="search"
                        className="block outline-none w-full md:w-full text-lg p-3 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder:text-lg transition duration-200 focus:ring-2 focus:ring-tertiary"
                        ref={ref}
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                </div>
            </form>
        </div>
    )
})

export default SearchBar
