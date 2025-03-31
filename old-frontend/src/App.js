import { Route , BrowserRouter as Router ,Routes } from "react-router-dom";
import Home from "./pages/home";
import House from "./pages/house";
import Navbar from "./components/Navbar";
import Viewer3D from "./pages/Viewer3D";
import React from "react";
const App = ()=>{
  return(<>
          <main className="bg-slate-300/20">

        <Router>
          < Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/house" element={<House/>} />
            <Route path="/3D" element={<Viewer3D/>} />
          </Routes>

        </Router>

    </main>
  </>
  );
}
export default App;