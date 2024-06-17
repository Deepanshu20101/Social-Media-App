import React from "react";
import LoginPage from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
