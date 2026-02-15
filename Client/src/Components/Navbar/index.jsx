import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <h1>سین جیم</h1>
      <div>
      <Link to="/">Home</Link>
      <Link to="/auth">Login/Register</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/exercises/all/all/all-exercise"></Link>
      <Link to="/workoutlist">برنامه های تمرینی من</Link>
      <Link to="/reports">Reports</Link>
      </div>
    </div>
  );
}
