import React from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input  style={{ width: '250px' }} className="form-control mb-2" placeholder="username" />
      <input  style={{ width: '250px' }} className="form-control mb-2 "placeholder="password" type="password" />
      <input style={{ width: '250px' }} className="form-control mb-2 "placeholder="verify password" type="password" />
      <Link  style={{ width: '250px' }} className="btn btn-primary mb-2" id="wd-signin-btn" to="/Kanbas/Account/Profile">
        Sign Up
      </Link><br/>
      <Link to="/Kanbas/Account/Signin" >Sign in</Link>
    </div>
  );}