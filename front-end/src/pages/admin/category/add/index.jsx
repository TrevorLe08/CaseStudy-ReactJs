import { useDispatch } from 'react-redux'
import { createCategory } from '../../../../service/categoryService'
import { useNavigate } from 'react-router-dom'
import { ButtonOutline } from '../../../../components/Button'
import { InputForm } from '../../../../components/Input'
import { Form, Formik } from 'formik'
import { useToast } from '../../../../context/ToastContext'
import { ToastSuccess } from '../../../../components/Toast'

export default function AddCategory() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()

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
                initialValues={{
                    name: ""
                }}
                onSubmit={(values) => {
                    dispatch(createCategory(values)).then(() => {
                        toast.open(
                            <ToastSuccess info={"Adding successfully"}/>
                        )
                        setTimeout(() => { navigate("/admin/categories") }, 1000)
                    })
                }}
            >
                <div className='wrapper'>
                    <Form className='form-admin'>
                        <p className='text-2xl font-medium text-center'>Add category</p>
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
                                className={"mx-2 w-1/4 mt-2 py-2"}
                                hoverClass={"hover:bg-primary"}
                            >
                                Add
                            </ButtonOutline>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
