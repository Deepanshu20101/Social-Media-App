import React, { useState } from "react";
import LoginPage from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/home";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? <HomePage /> : <Navigate replace to="/login" />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
