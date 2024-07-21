import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, deleteProduct } from '../../../../service/productService'
import { getCategory } from '../../../../service/categoryService'
import { findCategory } from '../../../../redux/slices/productsSlice'
import { ButtonOutline } from '../../../../components/Button'
import {popularList} from '../../../../utils/constant'
import '../../style.css'
import { useToast } from '../../../../context/ToastContext'

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
                <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                    <i class="bi bi-check2-circle text-4xl"></i>
                    <div>
                        <h1 className='font-bold'>Alert</h1>
                        <p className='text-sm'>Delete successfully</p>
                    </div>
                </div>
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
                        text={(
                            <>
                                Add products
                                <i className="bi bi-plus-square text-xl ml-2"></i>
                            </>
                        )}
                        color={"text-primary"}
                        border={"border-primary"}
                        hoverClass={"hover:bg-primary"}
                        onClick={() => navigate("/admin/products/add")}
                    />
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
                                    <td className='table-admin-td'><img className='mx-auto' src={product.images[0]} width='50px' alt='demo products' /></td>
                                    <td className='table-admin-td space-x-2'>
                                        <ButtonOutline
                                            text={<i className="bi bi-trash text-lg"></i>}
                                            color={"text-red-600"}
                                            border={"border-red-600"}
                                            hoverClass={"hover:bg-red-600"}
                                            onClick={() => handleDelete(product.id)}
                                        />
                                        <ButtonOutline
                                            text={<i className="bi bi-eye-fill"></i>}
                                            color={"text-green-500"}
                                            border={"border-green-500"}
                                            hoverClass={"hover:bg-green-500"}
                                            onClick={() => navigate(`/admin/products/detail/${product.id}`)}
                                        />
                                        <ButtonOutline
                                            text={<i className="bi bi-pencil-fill"></i>}
                                            color={"text-yellow-600"}
                                            border={"border-yellow-600"}
                                            hoverClass={"hover:bg-yellow-600"}
                                            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                        />
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
                    <ButtonOutline
                        text={(
                            <>
                                Edit list
                                <i className="bi bi-pencil-fill text-xl ml-2"></i>
                            </>
                        )}
                        color={"text-primary"}
                        border={"border-primary"}
                        hoverClass={"hover:bg-primary"}
                        onClick={() => {}}
                    />
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
