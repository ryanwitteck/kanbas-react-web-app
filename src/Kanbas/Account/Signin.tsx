import { Link } from "react-router-dom";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input style={{ width: '250px' }} className="form-control mb-2" id="wd-username" placeholder="username" />
      <input style={{ width: '250px' }} className="form-control mb-2" id="wd-password" placeholder="password" type="password" />
      <Link  style={{ width: '250px' }} className="btn btn-primary mb-2" id="wd-signin-btn" to="/Kanbas/Dashboard">
        Sign in
      </Link><br/>
      <Link  id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
    </div>
  );
}
