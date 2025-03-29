import { useState } from 'react'
import { Route , BrowserRouter as Router ,Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import House from "./pages/house.jsx";
import Navbar from "./components/Navbar.jsx";
import Viewer3D from "./pages/Viewer3D";
import React from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
      <main className="bg-slate-300/20">

          <Router>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/house" element={<House/>} />
                  <Route path="/3D" element={<Viewer3D/>} />
              </Routes>

          </Router>

      </main>
  )
}

export default App
