import { useDispatch } from 'react-redux'
import { createCategory } from '../../../../service/categoryService'
import { useNavigate } from 'react-router-dom'
import { ButtonOutline } from '../../../../components/Button'
import { InputForm } from '../../../../components/Input'
import { Form, Formik } from 'formik'
import { useToast } from '../../../../context/ToastContext'

export default function AddCategory() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()

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
                initialValues={{
                    name: ""
                }}
                onSubmit={(values) => {
                    dispatch(createCategory(values)).then(() => {
                        toast.open(
                            <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                                <i class="bi bi-check2-circle text-4xl"></i>
                                <div>
                                    <h1 className='font-bold'>Alert</h1>
                                    <p className='text-sm'>Adding successfully</p>
                                </div>
                            </div>
                        )
                        setTimeout(() => {navigate("/admin/categories")},1000)
                        
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
