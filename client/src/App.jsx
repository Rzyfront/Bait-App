import React from "react";
import "./App.css";
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
  );
}

export default App;
