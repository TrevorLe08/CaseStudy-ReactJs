import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readProduct, updateProduct } from '../../../../service/productService'
import { Formik, Form, Field } from 'formik'
import { getCategory } from '../../../../service/categoryService'
import { ButtonOutline } from '../../../../components/Button'
import { InputForm } from '../../../../components/Input'
import { useToast } from '../../../../context/ToastContext'
import { ToastSuccess } from '../../../../components/Toast'

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
                textColor={"text-primary"}
                border={"border-primary"}
                hoverClass={"hover:bg-primary"}
                className={"mx-2 px-3 py-2 mb-2"}
                onClick={() => navigate("/admin/products")}
            >
                <i className="bi bi-arrow-return-left mr-2"></i>
                <span>Back</span>
            </ButtonOutline>
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
                            <ToastSuccess info={"Upload successfully"}/>
                        )
                        setTimeout(() => { navigate("/admin/products") }, 1000)

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
                                textColor={"text-primary"}
                                border={"border-primary"}
                                hoverClass={"hover:bg-primary"}
                                className={"py-2 px-2 w-1/4"}
                            >
                                Save
                            </ButtonOutline>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
