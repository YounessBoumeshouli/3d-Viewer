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
import CreatorAnalyticsPage from "./pages/Creator/CreatorAnalyticsPage.jsx";
import CreatorModelsPage from "./pages/Creator/CreatorModelsPage.jsx";
import OverviewPage from "./pages/Creator/OverviewPage.jsx";
import SettingsPage from "./pages/Creator/SettingsPage.jsx";
import { jwtDecode } from "jwt-decode";

function AnalyticsPage() {
    return null;
}

function App() {
const  token = localStorage.getItem('token')
    if (token){
      const   {role} = jwtDecode(token)
        console.log(role)
    }
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


                  <Route path="/AnalyticsPage" element={<CreatorAnalyticsPage />} />
                  <Route path="/ModelsPage" element={<CreatorModelsPage />} />
                  <Route path="/OverView" element={<OverviewPage />} />
                  <Route path="/SettingsPage" element={<SettingsPage />} />

              </Routes>

          </Router>

      </main>
  )
}

export default App
