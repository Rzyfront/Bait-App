import React from "react";
import "./App.css";
import {
  Landing,
  Home,
  Profile,
  Locales,
  Answers,
} from "./components/components.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/createplace" element={<Locales />} />
        <Route path="/answers" element={<Answers />} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
