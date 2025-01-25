import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogList from "./pages/BlogList.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
