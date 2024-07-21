import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts } from '../../../../service/cartService'

export default function ListCart() {
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.cart)

    useEffect(() => {
        const getData = () => dispatch(getCarts())
        getData()
    }, [dispatch])
    return (
        <div className='m-2'>
            <div className='bg-white p-4 mt-[10px] rounded-md'>
                <p className='text-base font-medium text-tertiary'># List Cart</p>
                <table className='table-admin'>
                    <thead>
                        <tr>
                            <th className='table-admin-th'>#</th>
                            <th className='table-admin-th'>User</th>
                            <th className='table-admin-th'>Total</th>
                            <th className='table-admin-th'>Amount</th>
                            <th className='table-admin-th'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((cart, index) => (
                            <tr key={index} className='hover:bg-gray-200'>
                                <td className='table-admin-td'>{index + 1}</td>
                                <td className='table-admin-td'>{cart.user.name}</td>
                                <td className='table-admin-td'>{cart.total}k</td>
                                <td className='table-admin-td'>{cart.amount}</td>
                                <td className='table-admin-td'>{cart.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
