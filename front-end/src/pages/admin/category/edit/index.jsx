import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { readCategory, updateCategory } from '../../../../service/categoryService'
import { ButtonOutline } from '../../../../components/Button'
import { InputForm } from '../../../../components/Input'
import { useToast } from '../../../../context/ToastContext'
import { ToastSuccess } from '../../../../components/Toast'

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
                textColor={"text-primary"}
                border={"border-primary"}
                hoverClass={"hover:bg-primary"}
                className={"mx-2 py-2 px-3"}
                onClick={() => navigate("/admin/categories")}
            >
                <i className="bi bi-arrow-return-left mr-2"></i>
                <span>Back</span>
            </ButtonOutline>
            <Formik
                initialValues={currentCategory}
                enableReinitialize={true}
                onSubmit={(values) => {
                    dispatch(updateCategory(values)).then(() => {
                        toast.open(
                            <ToastSuccess info={"Upload successfully"} />
                        )
                        setTimeout(() => { navigate("/admin/categories") }, 1000)
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
                                textColor={"text-primary"}
                                border={"border-primary"}
                                hoverClass={"hover:bg-primary"}
                                className={"mx-2 mt-2 w-1/4 px-2 py-2"}
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
