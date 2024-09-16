import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import { Link } from "react-router-dom";
export default function Kanbas() {
  return (
    <div id="wd-kanbas">
      <Link to="/LandingPage">Back To Landing Page</Link>
      <br />
      <Link to="/Labs">To Labs</Link>
      <h1>Kanbas</h1>
      <Account />
    </div>
  );
}
