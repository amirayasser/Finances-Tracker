import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Input from './components/input/Input';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgetPassword from './utilities/ForgetPassword';
import Welcome from './pages/Welcome';
import ItemList from './components/item list/ItemList';
import ShowAllItems from './pages/ShowAllItems';
import ResetPassword from './pages/ResetPassword';
import Info from './pages/Info';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Welcome />} />
        <Route exact path='/info' element={<Info />} />
        <Route path="/home" element={<Home />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forget-password' element={<ForgetPassword/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path="/add" element={<Input />} />
        <Route path="/all-items" element={<ShowAllItems />} />
      </Routes>
    </Router>
  );
}

export default App;
