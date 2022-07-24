import Login from './pages/Login/Index';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Register from './pages/Register/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute/index';
import Home from './pages/Home';
import {ListProvider} from './context/lists/ListContext'
import { UserProvider } from './context/users/UserContext';
import PersonalBoard from './pages/personal/index';
import ProfessionalBoard from './pages/professional/index';
import Modal from 'react-modal'
import Categories from './pages/categories';

Modal.setAppElement('#root');
function App() {
  return (
    <UserProvider >
    <ListProvider>
      
    <Router>
      <Routes>
      <Route path='/' element={<Navigate to={'/all-boards'}/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/all-boards' element={<PrivateRoute />}>
        <Route path='/all-boards' element={<Home />} />
      </Route>
      <Route path='/personal' element={<PrivateRoute />}>
        <Route path='/personal' element={<PersonalBoard />} />
      </Route>
      <Route path='/professional' element={<PrivateRoute />}>
        <Route path='/professional' element={<ProfessionalBoard />} />
      </Route>
      <Route path='/categories' element={<PrivateRoute />}>
        <Route path='/categories' element={<Categories />} />
      </Route>
      </Routes>
      </Router>

      <ToastContainer />
    </ListProvider>
    </UserProvider>
    
  );
}

export default App;
