import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readProduct } from '../../../../service/productService'
import { getCarts, updateCart } from '../../../../service/cartService'
import { handleAddProduct } from '../../../../utils/cartAction'
import { ButtonGradient } from '../../../../components/Button'
import { Carousel } from "../../../../components/Carousel";
import { useToast } from '../../../../context/ToastContext'
import { ToastSuccess, ToastWarning } from '../../../../components/Toast'

export default function UserDetailProduct() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentProduct } = useSelector(state => state.product)
    const { carts } = useSelector(state => state.cart)
    const { currentUser, isLogged } = useSelector(state => state.user)
    const toast = useToast()
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
        const getData = (id) => {
            dispatch(readProduct(id))
            dispatch(getCarts())
        }
        getData(id)
    }, [dispatch, id])

    return (
        <div className='m-3'>
            <div className='mt-2'>
                <ButtonGradient
                    onClick={() => navigate("/store")}
                >
                    Back
                </ButtonGradient>
            </div>
            <div className='lg:flex lg:justify-center mt-4'>
                <div className='mb-4 lg:mb-0 lg:mr-14'>
                    <div className='max-w-lg mx-auto'>
                        <Carousel>
                            {currentProduct.images.map((url, index) => (
                                <img key={index} src={url} />
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className='w-full lg:w-[500px] pl-14 lg:border-l-2 lg:border-l-gray-500'>
                    <p className='text-xl font-medium'>{currentProduct.name}</p>
                    <p className='text-3xl font-medium'>{currentProduct.price}.000 VND</p>
                    <p className='text-base font-medium'>Mô tả:</p>
                    <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sed fuga rem ex. Aut vel iste, labore eaque aperiam tempora aliquam vero quae odit? Praesentium est rem expedita maxime perspiciatis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus temporibus saepe a ipsa quibusdam dolor laborum explicabo deserunt fugit, eveniet, rerum quidem. Impedit voluptatum nulla doloremque voluptate obcaecati quia officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error expedita nam explicabo. Ad, itaque voluptatum! Alias, corrupti id molestiae impedit neque reprehenderit assumenda tempore velit eveniet distinctio corporis temporibus asperiores.</p>
                    <ButtonGradient
                        onClick={() => handleAdd(currentProduct, yourCart)}
                    >
                        Add to cart
                    </ButtonGradient>
                </div>

            </div>
        </div>
    )
}
