import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import MainLayout from "./component/Layout/Layout";
import Home from "./component/Home/Home";
import Profile from "./component/Profile/Profile";
import Ads from "./component/Ads/Ads";
import PostAds from "./component/PostAd/PostAd";
import ProtectedRoute from "./Routes/ProtectedRoute";
import MyAccount from "./component/MyAccount/MyAccount";
import HomePage from "./component/Pages/HomePage";
import AdsViewPage from "./component/Pages/AdsViewPage";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/adsview/:adId" element={< AdsViewPage/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/myaccount" replace />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="myaccount" element={<MyAccount />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ads" element={<Ads />} />
          <Route path="postads" element={<PostAds />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
