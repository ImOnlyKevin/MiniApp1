import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Movies from './Components/Movies/Movies'
import User from './Components/User/User'
import Header from './Components/Header/Header';
import { createContext, useState } from 'react';

export const appContext = createContext()

function App() {



  return (
    <appContext.Provider value={null}>
      <Header />
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/movies' element={<Movies />} />
      </Routes>
    </appContext.Provider>
  );
}

export default App;
