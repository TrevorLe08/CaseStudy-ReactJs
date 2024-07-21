import { Route, Routes } from 'react-router-dom';
import './App.css'

// Pages
import Login from './pages/login-register/Login';
import Register from './pages/login-register/Register';
import Permission from './pages/Permission';
import NotFound from './pages/NotFound';
import RoutesAdmin from './utils/RoutesAdmin';
import RoutesUser from './utils/RoutesUser';

function App() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/*' element={<RoutesUser />} />
            <Route path='/admin/*' element={<RoutesAdmin />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/forbidden' element={<Permission />} />
        </Routes>
    );
}

export default App;