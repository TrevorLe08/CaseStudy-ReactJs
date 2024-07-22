import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategory } from '../../../../service/categoryService'
import { useNavigate } from 'react-router-dom'
import { ButtonOutline } from '../../../../components/Button'
import { useToast } from '../../../../context/ToastContext'
import { ToastSuccess } from '../../../../components/Toast'

export default function ListCategory() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const { categories } = useSelector(state => state.category)

    const handleDelete = (id) => {
        dispatch(deleteCategory(id)).then(() => {
            toast.open(
                <ToastSuccess info={"Delete successfuly"}/>
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
                    textColor={"text-primary"}
                    border={"border-primary"}
                    hoverClass={"hover:bg-primary"}
                    className={"px-3 py-2"}
                    onClick={() => navigate("/admin/categories/add")}
                >
                    Add Category
                    <i className="bi bi-plus-square text-xl ml-2"></i>
                </ButtonOutline>
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
                                        textColor={"text-red-600"}
                                        border={"border-red-600"}
                                        hoverClass={"hover:bg-red-600"}
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </ButtonOutline>
                                </td>
                                <td className='table-admin-td'>
                                    <ButtonOutline
                                        textColor={"text-green-500"}
                                        border={"border-green-500"}
                                        hoverClass={"hover:bg-green-500"}
                                        onClick={() => navigate(`/admin/categories/detail/${item.id}`)}
                                    >
                                        Detail
                                    </ButtonOutline>
                                </td>
                                <td className='table-admin-td'>
                                    <ButtonOutline
                                        textColor={"text-yellow-600"}
                                        border={"border-yellow-600"}
                                        hoverClass={"hover:bg-yellow-600"}
                                        onClick={() => navigate(`/admin/categories/edit/${item.id}`)}
                                    >
                                        Edit
                                    </ButtonOutline>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
