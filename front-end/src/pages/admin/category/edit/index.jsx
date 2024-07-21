import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { readCategory, updateCategory } from '../../../../service/categoryService'
import { ButtonOutline } from '../../../../components/Button'
import { InputForm } from '../../../../components/Input'
import { useToast } from '../../../../context/ToastContext'

export default function EditCategory() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()
    const { currentCategory } = useSelector(state => state.category)

    useEffect(() => {
        const getData = () => dispatch(readCategory(id))
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
                onSubmit={(values) => {
                    dispatch(updateCategory(values)).then(() => {
                        toast.open(
                            <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                                <i class="bi bi-check2-circle text-4xl"></i>
                                <div>
                                    <h1 className='font-bold'>Alert</h1>
                                    <p className='text-sm'>Update successfully</p>
                                </div>
                            </div>
                        )
                        setTimeout(() => {navigate("/admin/categories")},1000)
                    })
                }}
            >
                <div className='wrapper'>
                    <Form className='form-admin'>
                        <p className='text-2xl font-medium text-center'>Edit category id: {id}</p>
                        <InputForm 
                            label={"Name:"}
                            name={"name"}
                            type={"text"}
                            placeholder={"Enter name..."}
                            className="mr-7"
                        />
                        <div className='flex justify-center'>
                            <ButtonOutline
                                text="Add"
                                color={"text-primary"}
                                border={"border-primary"}
                                hoverClass={"hover:bg-primary mx-2 w-1/3 mt-2"}
                            />
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
