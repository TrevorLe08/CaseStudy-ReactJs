import React, { useEffect } from 'react'
import { ButtonOutline, ButtonNormal } from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { popularList, serviceList, saleOfferImg } from '../../../utils/constant'
import { CardPopular } from '../../../components/Card'
import { Carousel } from '../../../components/Carousel'
import { getProduct } from '../../../service/productService'
import Footer from '../../../components/Footer'

export default function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { products } = useSelector(state => state.product)
    const {isLogged} = useSelector(state => state.user)
    const newProduct = products.find(p => p.name === "Samsung Z Fold 5")

    useEffect(() => {
        const getData = () => dispatch(getProduct())
        getData()
    },[dispatch])
    return (
        <div>
            <div className='xl:padding-l wide:padding-r'>
                <div className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-1 max-container'>
                    <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x'>
                        <h1 className='font-barlow  text-8xl max-sm:text-[72px] max-sm:leading-[82]'>
                            <span className='xl:bg-white xl:whitespace-nowrap relative z-10 pr-10'>New Product</span>
                            <br />
                            <span className='text-tertiary mt-16'>{newProduct.name}</span>
                        </h1>
                        <p className='mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis cupiditate, architecto esse maxime, illo assumenda reiciendis dolore, ut explicabo vitae unde pariatur tempora nihil id vel corrupti fugiat sunt rem?</p>
                        <div className='mt-2 '>
                            <ButtonOutline
                                text={(
                                    <div className='flex justify-center items-center'>
                                        Show now
                                        <i className="bi bi-arrow-right text-xl ml-2"></i>
                                    </div>
                                )}
                                color={"text-tertiary"}
                                border={"border-tertiary"}
                                hoverClass={"hover:bg-tertiary"}
                                onClick={() => navigate(`/store/detail/${newProduct.id}`)}
                            />
                        </div>
                    </div>
                    <div className='max-w-xl mx-auto flex justify-center items-center'>
                        <Carousel autoSlide={true} autoSlideInterval={3000}>
                            {newProduct.images.map((url, index) => (
                                <img key={index} src={url} />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className='padding-x padding-b'>
                <div className='max-container'>
                    <div className='flex flex-col justify-start gap-5'>
                        <h1 className='text-4xl font-barlow font-medium'>Our
                            <span className='text-tertiary mx-2'>Popular</span>
                            Products
                        </h1>
                        <p className='lg:max-w-lg font-barlow'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, accusamus sint delectus optio quasi nesciunt culpa deleniti, hic expedita nam veniam esse. Veritatis magnam eaque culpa, inventore dicta dolores expedita.</p>
                    </div>
                    <div className='mt-10 grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 sm:gap-4 gap-14'>
                        {popularList.map((product) => (
                            <CardPopular key={product.id} name={product.name} images={product.images} price={product.price} onClick={() => navigate(`/store/detail/${product.id}`)} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full bg-gradient-to-r from-blue-700 to-[#b06ab3] px-6 py-12'>
                <div className='container mx-auto flex flex-col justify-center items-center text-center'>
                    <h1 className='text-white md:text-4xl text-3xl font-bold mb-4 font-barlow'>Discover Our New Products</h1>
                    <p className='text-white font-base text-center mb-8'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam distinctio, minus natus modi quia magnam dicta! Ipsum, illo. Nisi quia omnis magni molestiae molestias cumque vero vitae dolorum ducimus! Atque.</p>
                    <ButtonNormal
                        text={"Get started"}
                        bgColor={"bg-white"}
                        hoverClass={"hover:bg-gray-100"}
                        textColor={"text-tertiary"}
                        onClick={() => isLogged ? navigate("/store") : navigate("/login")}
                    />
                </div>
            </div>
            <div className='padding'>
                <div className='max-container flex justify-center flex-wrap gap-9'>
                    {serviceList.map((service, index) => (
                        <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-2xl px-10 py-16' key={index}>
                            <div className='w-11 h-11 flex justify-center items-center bg-tertiary rounded-full'>
                                <i className={`bi bi-${service.img} text-white text-2xl`}></i>
                            </div>
                            <h1 className="mt-4 font-barlow text-3xl leading-normal font-semibold">{service.label}</h1>
                            <p className='mt-2 break-words text-base leading-normal text-gray-700 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quaerat nam dolores cum ea facilis quisquam sequi, numquam a sint cupiditate beatae maxime nisi expedita nostrum ipsam exercitationem libero consectetur.</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='padding'>
                <div className='flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container'>
                    <div className='flex-1'>
                        <img src={saleOfferImg} width={773} className='object-contain w-full rounded-3xl' />
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <h1 className='font-barlow text-4xl capitalize font-bold lg:max-w-lg'>
                            <span className='text-tertiary mr-2'>Special Offer</span>
                            Sale
                        </h1>
                        <p className='mt-4 lg:max-w-lg info-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor possimus, dolores mollitia dignissimos veritatis harum autem eaque voluptatibus laudantium dicta cum accusantium sapiente! Unde, ad adipisci ducimus voluptas corporis ex?</p>
                        <p className='mt-4 info-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae in rem at nulla natus qui cumque. In exercitationem minima saepe, totam, libero hic illo nam optio labore perferendis a nobis.</p>
                        <div className='mt-9 flex flex-wrap gap-4'>
                            <ButtonNormal
                                text={"Shop now"}
                                bgColor={"bg-tertiary"}
                                hoverClass={"hover:bg-blue-700"}
                                onClick={() => navigate("/store")}
                            />
                            <ButtonNormal
                                text={"Learn more"}
                                bgColor={"bg-gray-100"}
                                hoverClass={"hover:bg-gray-100"}
                                textColor={"text-tertiary"}
                                onClick={() => alert("There aren't any special sale:)")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
