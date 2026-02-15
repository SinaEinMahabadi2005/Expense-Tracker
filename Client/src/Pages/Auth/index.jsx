import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
export default function Auth() {
  const { token } = useSelector((state) => state.auth);
  const [pageType, setPageType] = useState("register");
  const handlePageType = () => {
    setPageType(pageType == "login" ? "register" : "login");
  };
  if (token) {
    return <Navigate to="/profile" />;
  }
  return (
    <div>
      {pageType == "register" ? (
        <Register handlePageType={handlePageType} />
      ) : (
        <Login handlePageType={handlePageType} />
      )}
    </div>
  );
}
