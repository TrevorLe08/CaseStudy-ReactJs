import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readCategory } from '../../../../service/categoryService'
import { getProduct } from '../../../../service/productService'
import { Form, Formik } from 'formik'
import { ButtonOutline } from '../../../../components/Button'
import { InputForm } from '../../../../components/Input'

export default function DetailCategory() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentCategory } = useSelector(state => state.category)
    const { products } = useSelector(state => state.product)
    const listProduct = products.filter(item => item.category.name === currentCategory.name)

    useEffect(() => {
        const getData = () => {
            dispatch(getProduct())
            dispatch(readCategory(id))
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
                onClick={() => navigate("/admin/categories")}
            />
            <Formik
                initialValues={currentCategory}
                enableReinitialize={true}
            >
                <div className='wrapper'>
                    <Form className='form-admin'>
                        <p className='text-2xl font-medium text-center'>Detail category {id}</p>
                        <InputForm 
                            label={"ID:"}
                            name={"id"}
                            type={"number"}
                            className="mr-11"
                            disabled={true}
                        />
                        <InputForm 
                            label={"Name:"}
                            name={"name"}
                            type={"text"}
                            className="mr-4"
                            disabled={true}
                        />
                        <div>
                            <label className='text-lg font-medium mr-4' htmlFor="products">List Products:</label>
                            {listProduct.length > 0 ? (
                                <table className='table-admin'>
                                    <thead>
                                        <tr>
                                            <th className='table-admin-th'>#</th>
                                            <th className='table-admin-th'>Name</th>
                                            <th className='table-admin-th'>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listProduct.map((item, index) => (
                                            <tr>
                                                <td className='table-admin-td'>{index + 1}</td>
                                                <td className='table-admin-td'>{item.name}</td>
                                                <td className='table-admin-td'>{item.price}k</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className='text-xl font-medium text-center'>Products is empty ._.</p>
                            )}
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
