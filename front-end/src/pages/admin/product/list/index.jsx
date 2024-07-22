import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, deleteProduct } from '../../../../service/productService'
import { getCategory } from '../../../../service/categoryService'
import { findCategory } from '../../../../redux/slices/productsSlice'
import { ButtonOutline } from '../../../../components/Button'
import { popularList } from '../../../../utils/constant'
import { useToast } from '../../../../context/ToastContext'
import '../../style.css'
import { ToastSuccess } from '../../../../components/Toast'

export default function ListProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const { products, searchCategory } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.category)

    // Products will change if category and search change
    const searchList = products.filter(item =>
        searchCategory === "All" ? item : item.category.name === searchCategory
    )

    const handleDelete = (id) => {
        dispatch(deleteProduct(id)).then(() => {
            toast.open(
                <ToastSuccess info={"Delete successfully"}/>
            )
            window.location.reload()
        })
    }
    useEffect(() => {
        const getData = () => {
            dispatch(getProduct())
            dispatch(getCategory())
        }
        getData()
    }, [dispatch])

    return (
        <div className='m-2'>
            <div className='bg-white p-4 mt-[10px] rounded-md'>
                <p className='text-blue-500 font-medium mb-2 ml-1 cursor-default'># List products</p>
                <div className='my-2'>
                    <ButtonOutline
                        textColor={"text-primary"}
                        border={"border-primary"}
                        hoverClass={"hover:bg-primary"}
                        onClick={() => navigate("/admin/products/add")}
                    >
                        Add products
                        <i className="bi bi-plus-square text-xl ml-2"></i>
                    </ButtonOutline>
                </div>
                <div className='mb-3'>
                    <label htmlFor="category" className='block outline-0 mb-2 text-base font-medium text-gray-900'>Category</label>
                    <select
                        id='category'
                        onChange={(e) => dispatch(findCategory(e.target.value))}
                        value={searchCategory}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5'
                    >
                        <option value="All">Tất cả</option>
                        {categories.map((category, index) => (
                            <option
                                value={category.name}
                                key={index}
                            >{category.name}</option>
                        ))}
                    </select>
                </div>
                {searchList.length > 0 ? (
                    <table className='table-admin'>
                        <thead>
                            <tr>
                                <th className='table-admin-th px-2'>#</th>
                                <th className='table-admin-th'>Name</th>
                                <th className='table-admin-th'>Price</th>
                                <th className='table-admin-th'>Quantity</th>
                                <th className='table-admin-th'>Image</th>
                                <th className='table-admin-th'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchList.map((product, index) => (
                                <tr key={index} className='hover:bg-gray-200'>
                                    <td className='table-admin-td'>{index + 1}</td>
                                    <td className='table-admin-td'>{product.name}</td>
                                    <td className='table-admin-td'>{product.price}k</td>
                                    <td className='table-admin-td'>{product.quantity}</td>
                                    <td className='table-admin-td'>
                                        <img
                                            className='mx-auto size-[50px]'
                                            src={product.images[0]}
                                            alt='Image products'
                                        />
                                    </td>
                                    <td className='table-admin-td space-x-2'>
                                        <ButtonOutline
                                            textColor={"text-red-600"}
                                            border={"border-red-600"}
                                            hoverClass={"hover:bg-red-600"}
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <i className="bi bi-trash text-lg"></i>
                                        </ButtonOutline>

                                        <ButtonOutline
                                            textColor={"text-green-500"}
                                            border={"border-green-500"}
                                            hoverClass={"hover:bg-green-500"}
                                            onClick={() => navigate(`/admin/products/detail/${product.id}`)}
                                        >
                                            <i className="bi bi-eye-fill"></i>
                                        </ButtonOutline>

                                        <ButtonOutline
                                            textColor={"text-yellow-600"}
                                            border={"border-yellow-600"}
                                            hoverClass={"hover:bg-yellow-600"}
                                            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </ButtonOutline>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <>
                        <p className='text-center text-2xl font-bold'>Nothing here ._.</p>
                    </>
                )}
            </div>
            <div className='bg-white p-4 mt-[10px] rounded-md'>
                <p className='text-red-500 font-medium mb-2 ml-1 cursor-default'># Popular products</p>
                <div className='my-2'>
                    <ButtonOutline>
                        Edit list
                        <i className="bi bi-pencil-fill text-xl ml-2"></i>
                    </ButtonOutline>
                </div>

                <table className='table-admin'>
                    <thead>
                        <tr>
                            <th className='table-admin-th px-2'>#</th>
                            <th className='table-admin-th'>Image</th>
                            <th className='table-admin-th'>Name</th>
                            <th className='table-admin-th'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {popularList.map((item, index) => (
                            <tr key={index} className='hover:bg-gray-200'>
                                <td className='table-admin-td text-lg'>{index + 1}</td>
                                <td className='table-admin-td text-lg'><img className='mx-auto' src={item.images[0]} width='50px' alt='demo products' /></td>
                                <td className='table-admin-td text-lg'>{item.name}</td>
                                <td className='table-admin-td text-lg'>{item.price}k</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
