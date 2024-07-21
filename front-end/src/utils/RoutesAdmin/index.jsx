import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import PageAdmin from '../../containers/PageAdmin';
import Product from '../../pages/admin/product';
import ListProduct from '../../pages/admin/product/list';
import AddProduct from '../../pages/admin/product/add';
import DetailProduct from '../../pages/admin/product/detail';
import EditProduct from '../../pages/admin/product/edit';
import Category from '../../pages/admin/category';
import ListCategory from '../../pages/admin/category/list';
import AddCategory from '../../pages/admin/category/add';
import DetailCategory from '../../pages/admin/category/detail';
import EditCategory from '../../pages/admin/category/edit';
import Cart from '../../pages/admin/cart';
import ListCart from '../../pages/admin/cart/list';
import HomeAdmin from '../../pages/admin/home';

const RoutesAdmin = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        currentUser.isAdmin && currentUser
            ?
            <Routes>
                <Route path='' element={<PageAdmin />}>
                    <Route index element={<HomeAdmin />} />
                    <Route path='products' element={<Product />}>
                        <Route index element={<ListProduct />} />
                        <Route path='add' element={<AddProduct />} />
                        <Route path='detail/:id' element={<DetailProduct />} />
                        <Route path='edit/:id' element={<EditProduct />} />
                    </Route>
                    <Route path='categories' element={<Category />} >
                        <Route index element={<ListCategory />} />
                        <Route path='add' element={<AddCategory />} />
                        <Route path='detail/:id' element={<DetailCategory />} />
                        <Route path='edit/:id' element={<EditCategory />} />
                    </Route>
                    <Route path='carts' element={<Cart />} >
                        <Route index element={<ListCart />} />
                    </Route>
                </Route>
            </Routes>
            :
            <Navigate to="/forbidden" />
    )
}

export default RoutesAdmin
