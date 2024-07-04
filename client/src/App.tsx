import React, { useContext, useState } from "react";
import LoginPage from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/home";
import "./App.css";
import ProfilePage from "./components/profile/profile";
import { Context } from "./context/contextprovider";
import Chat from "./components/chat/chat";

function App() {
  const { state } = useContext(Context);
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              state.currentUser ? (
                <HomePage />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/profile/:userId"
            element={
              state.currentUser ? (
                <ProfilePage />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/chat"
            element={
              state.currentUser ? <Chat /> : <Navigate replace to="/login" />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
