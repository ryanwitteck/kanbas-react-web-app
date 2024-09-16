import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import { Link } from "react-router-dom";
export default function Labs() {
  return (
    <div>
      <Link to="/LandingPage">Back To Landing Page</Link>
      <br />
      <Link to="/Kanbas">To Kanbas</Link>
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
        <Route path="Lab4" element={<Lab4 />} />
      </Routes>
    </div>
  );
}
