import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategory } from '../../../../service/categoryService'
import { useNavigate } from 'react-router-dom'
import { ButtonOutline } from '../../../../components/Button'
import { useToast } from '../../../../context/ToastContext'

export default function ListCategory() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const { categories } = useSelector(state => state.category)

    const handleDelete = (id) => {
        dispatch(deleteCategory(id)).then(() => {
            toast.open(
                <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                    <i class="bi bi-check2-circle text-4xl"></i>
                    <div>
                        <h1 className='font-bold'>Alert</h1>
                        <p className='text-sm'>Delete successfully</p>
                    </div>
                </div>
            )
            // Reload page for fun :v
            window.location.reload()
        })
    }

    useEffect(() => {
        const getData = () => dispatch(getCategory())
        getData()
    }, [dispatch])
    return (
        <div className='m-2'>
            <div className='bg-white p-4 mt-[10px] rounded-md'>
                <p className='text-blue-500 font-medium mb-2 ml-1 cursor-default'># List category</p>
                <ButtonOutline
                    text={(
                        <>
                            Add Category
                            <i className="bi bi-plus-square text-xl ml-2"></i>
                        </>
                    )}
                    color={"text-primary"}
                    border={"border-primary"}
                    hoverClass={"hover:bg-primary"}
                    onClick={() => navigate("/admin/categories/add")}
                />
                <table className='table-admin'>
                    <thead>
                        <tr>
                            <th className='table-admin-th'>#</th>
                            <th className='table-admin-th'>Name</th>
                            <th className='table-admin-th'>Delete</th>
                            <th className='table-admin-th'>Detail</th>
                            <th className='table-admin-th'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item, index) => (
                            <tr key={index} className='hover:bg-gray-200'>
                                <td className='table-admin-td'>{index + 1}</td>
                                <td className='table-admin-td'>{item.name}</td>
                                <td className='table-admin-td'>
                                    <ButtonOutline
                                        text={'Delete'}
                                        color={"text-red-600"}
                                        border={"border-red-600"}
                                        hoverClass={"hover:bg-red-600"}
                                        onClick={() => handleDelete(item.id)}
                                    />
                                </td>
                                <td className='table-admin-td'>
                                    <ButtonOutline
                                        text={"Detail"}
                                        color={"text-green-500"}
                                        border={"border-green-500"}
                                        hoverClass={"hover:bg-green-500"}
                                        onClick={() => navigate(`/admin/categories/detail/${item.id}`)}
                                    />
                                </td>
                                <td className='table-admin-td'>
                                    <ButtonOutline
                                        text={"Edit"}
                                        color={"text-yellow-600"}
                                        border={"border-yellow-600"}
                                        hoverClass={"hover:bg-yellow-600"}
                                        onClick={() => navigate(`/admin/categories/edit/${item.id}`)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
