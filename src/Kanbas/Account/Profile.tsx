import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input  style={{ width: '250px' }} className="form-control mb-2" id="wd-username" value="alice" placeholder="username" />
      <input style={{ width: '250px' }} className="form-control mb-2" id="wd-password" value="123" placeholder="password"
             type="password" />
      <input style={{ width: '250px' }} className="form-control mb-2" id="wd-firstname" value="Alice" placeholder="First Name" />
      <input style={{ width: '250px' }} className="form-control mb-2" id="wd-lastname" value="Wonderland" placeholder="Last Name" />
      <input style={{ width: '250px' }} className="form-control mb-2" id="wd-dob" value="2000-01-01" type="date" />
      <input style={{ width: '250px' }} className="form-control mb-2" id="wd-email" value="alice@wonderland" type="email" />
      <select style={{ width: '250px' }} className="form-control mb-2" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link  style={{ width: '250px' }} className="btn btn-danger mb-2" id="wd-signin-btn" to="/Kanbas/Account/Signin">
        Sign Out
      </Link><br/>
    </div>
);}
