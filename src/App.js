import logo from './logo.svg';
import Login from './pages/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import {ListProvider} from './context/lists/ListContext'


function App() {
  return (
    <ListProvider>
    <Router>
      <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/all-boards' element={<PrivateRoute />}>
        <Route path='/all-boards' element={<Home />} />
      </Route>
      <Route path='/all-boards' element={<PrivateRoute />}>
        <Route path='/all-boards' element={<Home />} />
      </Route>
      <Route path='/professional' element={<PrivateRoute />}>
        <Route path='/professional' element={<Home />} />
      </Route>
      <Route path='/personal' element={<PrivateRoute />}>
        <Route path='/personal' element={<Home />} />
      </Route>
      </Routes>
      </Router>

      <ToastContainer />

    </ListProvider>
  );
}

export default App;
