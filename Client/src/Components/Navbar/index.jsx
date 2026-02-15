import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <h1>Cin Mony </h1>
      <div>
      <Link to="/">Home</Link>
      <Link to="/auth">Login/Register</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/categories/all/all">Categories</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/reports">Reports</Link>
      </div>
    </div>
  );
}
