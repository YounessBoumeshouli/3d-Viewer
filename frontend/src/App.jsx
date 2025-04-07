import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import Home from "./pages/home.jsx";
import House from "./pages/house.jsx";
import Navbar from "./components/Navbar.jsx";
import Viewer3D from "./pages/Viewer3D";
import React from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Components from "./pages/Components.jsx";
import Team from "./pages/Team.jsx";
import CreatorDashboard from "./pages/CreatorDashboard.jsx";
import ViewerPage from "./pages/ViewerPage.jsx";
import ModelPage from "./pages/ModelPage.jsx";
import DesignerPage from "./pages/DesignerPage.jsx";
import ModelsPage from "./pages/ModelsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
function AnalyticsPage() {
    return null;
}

function App() {

  return (
      <main className="bg-slate-300/20">

          <Router>
              <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/components" element={<Components />} />
                  <Route path="/creator" element={<CreatorDashboard />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/3D" element={<Viewer3D/>} />
                  <Route path="/Dashboard" element={<Dashboard/>} />
                  <Route path="/analytics" element={<AnalyticsPage/>} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/models" element={<ModelsPage />} />
                  <Route path="/designer/:id" element={<DesignerPage />} />
                  <Route path="/model/:id" element={<ModelPage />} />
                  <Route path="/viewer" element={<ViewerPage />} />
              </Routes>

          </Router>

      </main>
  )
}

export default App
