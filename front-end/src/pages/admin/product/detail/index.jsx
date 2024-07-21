import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readProduct } from '../../../../service/productService'
import { Field, Form, Formik } from 'formik'
import { Carousel } from '../../../../components/Carousel'
import { getCategory } from '../../../../service/categoryService'
import { ButtonOutline } from '../../../../components/Button'
import { InputForm } from '../../../../components/Input'

export default function DetailProduct() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { id } = useParams()
    const { currentProduct } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.category)
    const [current, setCurrent] = useState(0)

    const changeSlide = (action) => {
        if (action === "previous") {
            current === 0 ? setCurrent(currentProduct.images.length - 1) : setCurrent(current - 1)
        } else {
            current === currentProduct.images.length - 1 ? setCurrent(0) : setCurrent(current + 1)
        }
    }

    useEffect(() => {
        const getData = () => {
            dispatch(readProduct(id))
            dispatch(getCategory())
        }
        getData()
    }, [dispatch])
    return (
        <div>
            <ButtonOutline
                text={
                    (<>
                        <i className="bi bi-arrow-return-left mr-2"></i>
                        <span>Back</span>
                    </>)
                }
                color={"text-primary"}
                border={"border-primary"}
                hoverClass={"hover:bg-primary mx-2"}
                onClick={() => navigate("/admin/products")}
            />
            <Formik
                initialValues={currentProduct}
                enableReinitialize={true}
            >
                <div className="wrapper">
                    <Form className='form-admin w-[600px]'>
                        <p className='text-2xl font-medium text-center'>Detail Product ID: {id}</p>
                        <InputForm 
                            label={"Name:"}
                            name={"name"}
                            type={"text"}
                            placeholder={"Enter name..."}
                            className="mr-7"
                            disabled={true}
                        />
                        <InputForm 
                            label={"Price:"}
                            name={"price"}
                            type={"number"}
                            placeholder={"Enter price..."}
                            className="mr-9"
                            disabled={true}
                        />
                        <InputForm 
                            label={"Quantity:"}
                            name={"quantity"}
                            type={"number"}
                            placeholder={"Enter quantity..."}
                            className="mr-2"
                            disabled={true}
                        />
                        <div>
                            <label className="form-label mr-2 ">Category:</label>
                            <Field as="select" name='category.name' className="form-select mb-4 mt-2">
                                {categories.map((category) => (
                                    <option value={category.name} key={category.id} disabled>{category.name}</option>
                                ))}
                            </Field>
                        </div>
                        <div>
                            <p className='form-label mr-2 '>Images: </p>
                            <Carousel>
                                {currentProduct.images.map((url, index) => (
                                    <img key={index} src={url} alt="Products" />
                                ))}
                            </Carousel>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
