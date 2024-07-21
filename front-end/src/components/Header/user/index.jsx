import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findSearch } from '../../../redux/slices/productsSlice'
import { getCategory } from '../../../service/categoryService'
import Switch from '../../Switch'
import { MyContext } from '../../../context/MyContext'
import SearchBar from '../../SearchBar'

export default function Header() {
    const dispatch = useDispatch()
    const inputRef = useRef()
    const { categories } = useSelector(state => state.category)
    const [checkedState, setCheckedState] = useState(new Array(categories.length).fill(false))
    const [mulCategory, setMulCategory] = useContext(MyContext)
    let listCategory = []

    const handleSearch = () => {
        const value = inputRef.current.value
        dispatch(findSearch(value))
    }
    const handleChange = (position) => {
        const updateCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        )
        categories.forEach((item, index) => {
            if (updateCheckedState[index] === true) {
                listCategory = [...listCategory, item.name]
            }
        })
        setCheckedState(updateCheckedState)
        setMulCategory(listCategory)
    }

    useEffect(() => {
        const getData = () => dispatch(getCategory())
        getData()
    }, [dispatch])

    return (
        <div className='flex justify-between md:block '>
            <div className='mt-2 w-96 md:w-auto'>
                <p className='text-xl font-bold mr-2 font-sans'>Tìm kiếm:</p>
                <SearchBar
                    placeholder={"Tìm kiếm sản phẩm..."}
                    onChange={() => handleSearch()}
                    ref={inputRef}
                />
            </div>
            <div className='mb-4 mt-3 pl-10 pr-5 md:border-none md:px-0'>
                <span className='text-xl font-bold mr-2 font-sans'>Danh mục:</span>
                {categories.map((item, index) => (
                    <div key={index}>
                        <Switch
                            label={item.name}
                            isOn={checkedState[index]}
                            onChange={() => handleChange(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
