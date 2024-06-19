import React from "react";
import LoginPage from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/home";
import TopBar from "./components/topbar/topbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
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
