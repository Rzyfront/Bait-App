import React from "react";
import "./App.css";
<<<<<<< HEAD
// import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home";
// import Profile from "./components/Profile/Profile";

function App() {
  return (
    // <Profile />
    <Home />
    // <Landing/>
=======
import { Landing, Home, Profile, FormRest } from "./components/components.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createplace" element={<FormRest />} />
      <Route exact path="/" element={<Landing />} />
    </Routes>
>>>>>>> 6f568db4771994267e43a29e3f24f0e02f82721e
  );
}

export default App;
