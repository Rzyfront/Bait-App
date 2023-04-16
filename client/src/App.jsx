import React from "react";
import "./App.css";
import { Landing, Home, Profile, Locales,Register } from "./components/components.js";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createplace" element={<Locales />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
