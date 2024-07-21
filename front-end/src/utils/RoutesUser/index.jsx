import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageUser from '../../containers/PageUser';
import UserProduct from '../../pages/user/store/ListProduct';
import ViewProduct from '../../pages/user/store/ViewProduct';
import YourCart from '../../pages/user/your-cart';
import HomeUser from '../../pages/user/home';
import NotFound from '../../pages/NotFound';

const RoutesUser = () => {
    return (
        <Routes>
            <Route path='' element={<PageUser />}>
                <Route index element={<HomeUser />} />
                <Route path='store' element={<UserProduct />} />
                <Route path='store/detail/:id' element={<ViewProduct />} />
                <Route path='your-cart' element={<YourCart />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}
export default RoutesUser