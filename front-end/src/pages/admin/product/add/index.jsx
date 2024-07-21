import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../../../service/categoryService'
import { createProduct } from '../../../../service/productService'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { imageStorage } from '../../../../firebase.config'
import { ButtonOutline } from '../../../../components/Button'
import { InputForm } from '../../../../components/Input'
import { useToast } from '../../../../context/ToastContext'

export default function AddProduct() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)
    const [msg, setMsg] = useState("Click to upload images")
    const [status, setStatus] = useState("")
    const [isUpload, setIsUpload] = useState(false)
    const [lengthUrl, setLengthUrl] = useState(0)
    const [imgUrl, setImgUrl] = useState([])
    const toast = useToast()

    const handleUploadImg = (list) => {
        list.forEach(img => {
            const imgRef = ref(imageStorage, `images/${img.name + v4()}`)
            uploadBytes(imgRef, img).then((value) => {
                getDownloadURL(value.ref).then((url) => {
                    setImgUrl(data => [...data, url])
                })
            })
        })
    }
    useEffect(() => {
        const getData = () => dispatch(getCategory())
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
                initialValues={{
                    name: '',
                    price: '',
                    quantity: '',
                    category: {
                        name: categories[0].name
                    },
                }}
                onSubmit={(values) => {
                    if (imgUrl.length !== 0) {
                        if (imgUrl.length !== lengthUrl) {
                            setStatus("The number of images is missing")
                            return;
                            // Wait imgUrl return all link image
                        }
                        setStatus("Loading...")
                        setTimeout(() => {
                            values = {
                                ...values,
                                category: {
                                    id: categories.find(e => e.name === values.category.name).id,
                                    name: values.category.name
                                },
                                images: imgUrl
                            }
                            dispatch(createProduct(values)).then(() => {
                                setStatus("Done ✔")
                                toast.open(
                                    <div className='flex gap-2 bg-green-400 text-green-800 p-6 rounded-lg shadow-lg'>
                                        <i class="bi bi-check2-circle text-4xl"></i>
                                        <div>
                                            <h1 className='font-bold'>Alert</h1>
                                            <p className='text-sm'>Adding successfully</p>
                                        </div>
                                    </div>
                                )
                                setTimeout(() => {
                                    navigate("/admin/products")
                                }, 1000)
                            })
                        }, 1000) // setTimeout for fun :v
                    } else {
                        setStatus("Link image is empty")
                    }
                }}
            >
                <div className='wrapper'>
                    <Form className='form-admin'>
                        <p className='text-2xl font-medium text-center'>Add Product</p>
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
                        <div className="flex items-center justify-center w-full mb-4">
                            <label className={`flex flex-col items-center justify-center w-full h-32 border-2  ${isUpload ? "border-green-500" : "border-gray-300"} border-dashed rounded-lg cursor-pointer bg-gray-50`}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <i className={`bi ${isUpload ? 'bi-cloud-check text-green-500' : 'bi-cloud-upload text-gray-500'} w-8 h-8 mb-4 text-5xl`}></i>
                                    <p className={`font-medium ${isUpload ? "text-green-500" : "text-gray-500"} mb-2 text-lg`}>
                                        {msg}
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className=""
                                    onChange={(e) => {
                                        const listFile = Array.from(e.target.files).map(file => file) // e.target.file isnt an Array and doesnt inherit from Array, so using Array.from() to return array 
                                        handleUploadImg(listFile)
                                        setMsg("File is sent")
                                        setLengthUrl(listFile.length)
                                        setIsUpload(true)
                                    }}
                                    multiple
                                />
                            </label>
                        </div>
                        <div className='flex justify-center'>
                            <ButtonOutline
                                text="Add"
                                color={"text-primary"}
                                border={"border-primary"}
                                hoverClass={"hover:bg-primary mx-2 w-1/3"}
                            />
                        </div>
                        <p className={`font-medium text-lg text-center mt-2 ${status === "Loading..." ? 'text-yellow-600' : (status === "Done ✔" ? 'text-green-500' : 'text-red-600')}`}>{status}</p>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}

