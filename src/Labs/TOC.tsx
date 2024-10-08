import { Link } from "react-router-dom";

export default function TOC() {
    return (
      <ul>
        <li><Link to="/Labs/Lab1">Lab 1</Link></li>
        <li><Link to="/Labs/Lab2">Lab 2</Link></li>
        <li><Link to="/Labs/Lab3">Lab 3</Link></li>
        <li><Link to="/Labs/Lab4">Lab 4</Link></li>
        <li><Link to="/Kanbas">Kanbas</Link></li>
        <li ><Link id="wd-github" to="https://github.com/ryanwitteck/kanbas-react-web-app">Link to Git Repository</Link></li>
      </ul>
    );
  }
  