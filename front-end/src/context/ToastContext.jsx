import { createContext, useContext, useState } from 'react'

const ToastContext = createContext()
export const useToast = () => useContext(ToastContext)

export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const open = (component, timeout = 5000) => {
        const id = Date.now()
        setToasts(toasts => [...toasts, { id, component }])
        setTimeout(() => close(id), timeout)
    }

    const close = (id) => 
        setToasts(toasts => toasts.filter(toast => toast.id !== id))

    return (
        <ToastContext.Provider value={{ open, close }}>
            {children}
            <div className='space-y-2 absolute bottom-4 right-4'>
                {toasts.map(({ id, component }) => (
                    <div className='relative' key={id}>
                        <button
                            onClick={() => close(id)}
                            className='absolute top-2 right-2 p-1 rounded-lg bg-gray-100/20 text-gray-800/60'
                        >
                            <i class="bi bi-x text-xl"></i>
                        </button>
                        {component}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}