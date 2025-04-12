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
import PrivateRoute from "./routes/PrivateRoute.jsx";


function App() {

  return (
      <main className="bg-slate-300/20">

          <Router>
              <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/analytics"
                         element={
                      <PrivateRoute allowedRoles={['admin', 'creator']}>
                          <Analytics/>
                      </PrivateRoute>
                  } />
                  <Route path="/team" element={
                      <PrivateRoute allowedRoles={['admin', 'creator']}>
                          <Team/>
                      </PrivateRoute>
                  }/>
                  <Route path="/components" element={
                      <PrivateRoute allowedRoles={['admin', 'creator']}>
                          <Components/>
                      </PrivateRoute>
                  } />
                  <Route path="/dashboard" element={
                      <PrivateRoute allowedRoles={['admin', 'creator']}>
                          <Dashboard/>
                      </PrivateRoute>
                  } />
                  <Route
                      path="/3D"
                      element={
                          <PrivateRoute allowedRoles={['admin', 'creator']}>
                              <Viewer3D/>
                          </PrivateRoute>
                      }
                  />
                  <Route path="/creatorDashboard" element={
                      <PrivateRoute allowedRoles={['creator']}>
                          <CreatorDashboard/>
                      </PrivateRoute>
                  } />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/models" element={<ModelsPage />} />
                  <Route path="/designer/:id" element={<DesignerPage />} />
                  <Route path="/model/:id" element={<ModelPage />} />
                  <Route path="/viewer" element={<ViewerPage />} />


                  <Route path="/AnalyticsPage" element={
                      <PrivateRoute allowedRoles={['admin', 'creator']}>
                          <CreatorAnalyticsPage/>
                      </PrivateRoute>
                  } />
                  <Route path="/ModelsPage" element={
                      <PrivateRoute allowedRoles={['creator']}>
                          <CreatorModelsPage/>
                      </PrivateRoute>
                  } />
                  <Route path="/OverView" element={
                      <PrivateRoute allowedRoles={[ 'creator']}>
                          <OverviewPage/>
                      </PrivateRoute>
                  } />
                  <Route path="/SettingsPage" element={
                      <PrivateRoute allowedRoles={['creator']}>
                          <SettingsPage/>
                      </PrivateRoute>
                  } />
                  <Route path="*" element={<Navigate to="/home" replace />} />

              </Routes>

          </Router>

      </main>
  )
}

export default App
