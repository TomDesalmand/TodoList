import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import LoginPage from './pages/LoginPage.js'
import RegisterPage from './pages/RegisterPage.js'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<HomePage/>} exact path="/"/>
          <Route element={<LoginPage/>} path="/login"/>
          <Route element={<RegisterPage/>} path="/register"/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
