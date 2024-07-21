import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readProduct, updateProduct } from '../../../../service/productService'
import { Formik, Form, Field } from 'formik'
import { getCategory } from '../../../../service/categoryService'
import { ButtonOutline } from '../../../../components/Button'
import { InputForm } from '../../../../components/Input'
import { useToast } from '../../../../context/ToastContext'

export default function EditProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { currentProduct } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.category)
    const toast = useToast()

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
                onSubmit={(values) => {
                    values = {
                        ...values,
                        category: {
                            id: categories.find(e => e.name === values.category.name).id,
                            name: values.category.name
                        },
                    }
                    dispatch(updateProduct(values)).then(() => {
                        toast.open(
                            <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                                <i class="bi bi-check2-circle text-4xl"></i>
                                <div>
                                    <h1 className='font-bold'>Alert</h1>
                                    <p className='text-sm'>Update successfully</p>
                                </div>
                            </div>
                        )
                        setTimeout(() => {navigate("/admin/products")},1000)
                        
                    })
                }}
            >
                <div className="wrapper">
                    <Form className='form-admin'>
                        <p className='text-2xl font-medium text-center'>Edit Product ID: {id}</p>
                        <InputForm 
                            label={"Name:"}
                            name={"name"}
                            type={"text"}
                            placeholder={"Enter name..."}
                            className="mr-7"
                        />
                        <InputForm 
                            label={"Price:"}
                            name={"price"}
                            type={"number"}
                            placeholder={"Enter price..."}
                            className="mr-9"
                        />
                        <InputForm 
                            label={"Quantity:"}
                            name={"quantity"}
                            type={"number"}
                            placeholder={"Enter quantity..."}
                            className="mr-2"
                        />
                        <div>
                            <label className="form-label mr-2 ">Category:</label>
                            <Field as="select" name='category.name' className="form-select mb-4 mt-2">
                                {categories.map((category) => (
                                    <option value={category.name} key={category.id}>{category.name}</option>
                                ))}
                            </Field>
                        </div>
                        <div className='flex justify-center'>
                            <ButtonOutline
                                text="Save"
                                color={"text-primary"}
                                border={"border-primary"}
                                hoverClass={"hover:bg-primary w-1/3"}
                            />
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
