import "./App.css";
import React from "react";

import NavBar from "./components/NavBar";
import About from "./components/About";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="App">
          <Routes>
            <Route exact path="/home" element={<Home />} />

            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
