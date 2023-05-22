import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Header from './components/commons/Header';
import Home from './pages/Home';
import Login from './components/users/Login';
import Register from './components/users/Register';
import Page from './pages/Page';
// import Previsions from './pages/Previsions';
// import Depenses from './pages/Depenses';
import Categories from './pages/Categories';
import NotFound from './pages/NotFound';

const App = () => {

  
  return (
    <main className='main bg-light'>
      <Header />
      <Routes basename={process.env.PUBLIC_URL} >
        <Route path="/" element={<Home />} />
        <Route path="/previsions" element={<Page fonctionnalite='previsions' />} />
        <Route path="/depenses" element={<Page fonctionnalite='depenses' />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;