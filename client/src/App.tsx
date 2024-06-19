import React from "react";
import LoginPage from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/home";
import TopBar from "./components/topbar/topbar";
import SideBarLeft from "./components/sidebarleft/sidebarleft";
import "./App.css";
import SideBarRight from "./components/sidebarright/sidebarright";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <TopBar />
          <SideBarLeft />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
          <SideBarRight />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
