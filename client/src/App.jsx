<<<<<<< HEAD
import "./App.css";
// import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home";
// import Profile from "./components/Profile/Profile";

function App() {
  return (
    // <Profile />
    <Home />
    // <Landing/>
=======

import React from "react";
import "./App.css";
import { Landing, Home, Profile, Locales } from "./components/components.js";
import { Routes, Route } from "react-router-dom";


function App() {
  return (

    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createplace" element={<Locales />} />
      <Route exact path="/" element={<Landing />} />
    </Routes>
>>>>>>> 941c3c69edee8228dbbc2a9f11b32ddabe47ae96
  );
}

export default App;
