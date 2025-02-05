import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../../../service/productService'
import { getCarts, updateCart } from '../../../../service/cartService'
import { useNavigate } from 'react-router-dom'
import { handleAddProduct } from '../../../../utils/cartAction'
import { MyContext } from '../../../../context/MyContext'
import { CardStore } from '../../../../components/Card'
import Header from '../../../../components/Header/user'
import { useToast } from '../../../../context/ToastContext'
import { ToastSuccess, ToastWarning } from '../../../../components/Toast'

export default function UserProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { products, searchName } = useSelector(state => state.product)
    const { carts } = useSelector(state => state.cart)
    const { currentUser, isLogged } = useSelector(state => state.user)
    const [mulCategory, setMulCategory] = useContext(MyContext)
    const toast = useToast()
    let searchList = []

    products.forEach(item => {
        if (mulCategory.length === 0) {
            if (searchName !== "") {
                if (item.name.toLowerCase().includes(searchName.toLowerCase())) {
                    searchList = [...searchList, item]
                }
            } else {
                searchList = [...searchList, item]
            }
        } else {
            mulCategory.forEach(nameCate => {
                if (item.category.name === nameCate) {
                    if (searchName !== "") {
                        if (item.name.toLowerCase().includes(searchName.toLowerCase())) {
                            searchList = [...searchList, item]
                        }
                    } else {
                        searchList = [...searchList, item]
                    }
                }
            });
        }
    })

    let yourCart = carts.find(cart => cart.user.username === currentUser.username)

    const handleAdd = (p, cart) => {
        if (!isLogged) {
            toast.open(
                <ToastWarning info={"Please log in to use service"}/>
            )
            return;
        } else if (currentUser.isAdmin) {
            toast.open(
                <ToastWarning info={"Admin cannot buy product"}/>
            )
            return;
        }
        const newCart = handleAddProduct(p, cart)
        dispatch(updateCart(newCart)).then(() => {
            toast.open(
                <ToastSuccess info={'Adding successfully'}/>
            )
        })
    }

    useEffect(() => {
        const getData = () => {
            dispatch(getProduct())
            dispatch(getCarts())
        }
        getData()
    }, [dispatch])

    return (
        <div className='grid md:grid-cols-3 xl:grid-cols-4 m-3'>
            <div className='static md:fixed md:w-1/3 xl:w-1/4 bg-white md:col-span-1 h-full'>
                {isLogged && !currentUser.isAdmin && <h3 className='text-lg font-bold'>Số lượng sản phẩm trong giỏ hàng: {yourCart.amount}</h3>}
                <Header />
            </div>
            <div className='md:col-end-4 md:col-start-2 xl:col-end-5'>
                <div className='pl-4 grid grid-cols-2 xl:grid-cols-4 gap-[10px]'>
                    {searchList.length === 0 ? (
                        <p className='text-2xl font-bold text-center col-span-2 md:col-span-4 '>
                            Nothing here ._.
                        </p>
                    ) : (
                        <>
                            {searchList.map(product => (
                                <div key={product.id}>
                                    <CardStore
                                        img={product.images[0]}
                                        name={product.name}
                                        price={product.price}
                                        onAdd={() => handleAdd(product, yourCart, isLogged)}
                                        onView={() => navigate(`/store/detail/${product.id}`)}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
