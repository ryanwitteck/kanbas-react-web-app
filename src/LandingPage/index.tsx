import { Routes, Route, Navigate } from "react-router";
import TOC from "./TOC";
import Lab1 from "../Labs/Lab1";
import Lab2 from "../Labs/Lab2";
import Lab3 from "../Labs/Lab4";
import Lab4 from "../Labs/Lab4";
import Kanbas from "../Kanbas";
import Labs from "../Labs";

export default function LandingPage() {
  return (
    <div id="wd-LandingPage">
      <h1>Landing Page</h1>
      <h3>Ryan Witteck</h3>
      <h4>Section 2</h4>
      <TOC />

    </div>
  );
}
